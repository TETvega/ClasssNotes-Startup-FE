import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import { useAttendanceStatusStore } from "../store";
import { paginateArray } from "../../../../shared/utils";
import { getStudentsStats, takeAttendance } from "../../../../shared/actions";
import connection from "../../../../config/attendanceHub";

// Funciones para localStorage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

// Funcion principal
export const useTakeAttendance = () => {
  const { currentCourse } = useBreadcrumbStore();
  const {
    setAttendanceStatus,
    setAttendancesInProgress,
    isAttendanceInProgress,
    removeAttendanceInProgress,
  } = useAttendanceStatusStore();

  // ==================== ESTADOS ====================

  // Estados para control de asistencia
  const [status, setStatus] = useState(() =>
    getFromLocalStorage("status", false),
  );
  const [qrChecked, setQrChecked] = useState(() =>
    getFromLocalStorage("qrChecked", false),
  );
  const [otpChecked, setOtpChecked] = useState(() =>
    getFromLocalStorage("otpChecked", false),
  );
  const [strictMode, setStrictMode] = useState(() =>
    getFromLocalStorage("strictMode", true),
  );
  const [isAttendaceRequestLoading, setIsLoading] = useState(false);
  const [firstRequest, setfirstRequest] = useState(() =>
    getFromLocalStorage("firstRequest", false),
  );
  const [hasTakenAttendanceToday, setHasTakenAttendanceToday] = useState(false);
  const [expiresIn, setExpiresIn] = useState(() =>
    getFromLocalStorage("expiresIn", null),
  );

  // Estados para datos de la asistencia
  const [qr, setQr] = useState(() =>
    getFromLocalStorage("qr", { base64: "", content: "" }),
  );
  const [allStudents, setAllStudents] = useState(() =>
    getFromLocalStorage("allStudents", []),
  );

  // Estados para paginación
  const pageSizeOptions = [6, 12, 24];
  const [pageSize, setPageSize] = useState(() =>
    getFromLocalStorage("pageSize", pageSizeOptions[0]),
  );
  const [page, setPage] = useState(() => getFromLocalStorage("page", 1));
  const [paginatedStudents, setPaginatedStudents] = useState(() =>
    paginateArray(allStudents, page, pageSize),
  );

  // Referencias para acceder a valores actualizados en callbacks
  const pageRef = useRef(page);
  const pageSizeRef = useRef(pageSize);

  // Query para obtener estadísticas de estudiantes
  const { refetch } = useQuery({
    queryKey: ["students-attendance-stats", currentCourse?.id],
    queryFn: () => getStudentsStats(currentCourse.id),
    enabled: false, // Evita que se ejecute automáticamente
    refetchOnWindowFocus: false,
  });

  // Variable derivada para métodos de asistencia seleccionados
  const selectedMethods = [];

  // ==================== EFECTOS ====================

  // Actualizar referencias cuando cambian valores
  useEffect(() => {
    pageRef.current = page;
  }, [page]);
  useEffect(() => {
    pageSizeRef.current = pageSize;
  }, [pageSize]);

  // Persistir estados en localStorage
  useEffect(() => saveToLocalStorage("status", status), [status]);
  useEffect(() => saveToLocalStorage("qrChecked", qrChecked), [qrChecked]);
  useEffect(() => saveToLocalStorage("otpChecked", otpChecked), [otpChecked]);
  useEffect(() => saveToLocalStorage("strictMode", strictMode), [strictMode]);
  useEffect(() => saveToLocalStorage("qr", qr), [qr]);
  useEffect(
    () => saveToLocalStorage("allStudents", allStudents),
    [allStudents],
  );
  useEffect(() => saveToLocalStorage("page", page), [page]);
  useEffect(() => saveToLocalStorage("pageSize", pageSize), [pageSize]);
  useEffect(
    () => saveToLocalStorage("firstRequest", firstRequest),
    [firstRequest],
  );
  useEffect(() => saveToLocalStorage("expiresIn", expiresIn), [expiresIn]);
  useEffect(
    () =>
      saveToLocalStorage("hasTakenAttendanceToday", hasTakenAttendanceToday),
    [hasTakenAttendanceToday],
  );

  // Establecer conexión SignalR cuando cambia el estado de la asistencia
  useEffect(() => {
    const attendanceInProgress = isAttendanceInProgress(currentCourse.id);

    if (status && attendanceInProgress) {
      startConnection();
      connection.off("UPDATE_ATTENDANCE_STATUS");
      connection.on("UPDATE_ATTENDANCE_STATUS", handleAttendanceUpdate);
      setfirstRequest(true);
    }

    if (hasTakenAttendanceToday) {
      stopAttendanceProcess();
    }

    return () => {
      connection.off("UPDATE_ATTENDANCE_STATUS", handleAttendanceUpdate);
    };
  }, [status, isAttendanceInProgress]);

  // Mostrar alerta de confirmación al cerrar la pestaña o refrescar, o cerra ventana de anvegador
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (status) {
        e.preventDefault();
        e.returnValue = ""; // Esto es necesario para activar la alerta
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [status]);

  // ==================== FUNCIONES DE PAGINACIÓN ====================

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const newPaginatedData = paginateArray(allStudents, newPage, pageSize);
    setPaginatedStudents(newPaginatedData);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
    const newPaginatedData = paginateArray(allStudents, 1, newPageSize);
    setPaginatedStudents(newPaginatedData);
  };

  const handleSearch = (searchTerm) => {
    const newPaginatedData = paginateArray(
      allStudents,
      page,
      pageSize,
      searchTerm,
    );
    setPaginatedStudents(newPaginatedData);
  };

  // ==================== FUNCIONES DE ASISTENCIA ====================

  // Limpiar el estado de la asistencia
  const clearAttendanceState = () => {
    const keys = [
      "status",
      "qrChecked",
      "otpChecked",
      "strictMode",
      "qr",
      "allStudents",
      "page",
      "pageSize",
      "firstRequest",
      "hasTakenAttendanceToday",
      "expiresIn",
    ];
    keys.forEach((key) => localStorage.removeItem(key));

    // Resetear estados
    setStatus(false);
    setQrChecked(false);
    setOtpChecked(false);
    setStrictMode(true);
  };

  // Manejar actualización de asistencia (desde SignalR)
  const handleAttendanceUpdate = (updatedStudent) => {
    if (updatedStudent.message)
      return handleAttendanceStatus(updatedStudent.message);

    setAllStudents((prevStudents) => {
      const index = prevStudents.findIndex(
        (s) => s.id === updatedStudent.studentId,
      );
      if (index === -1) return prevStudents;

      const updatedList = [...prevStudents];
      updatedList[index] = {
        ...updatedList[index],
        status: updatedStudent.status,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Paginar usando refs para mantener valores actuales
      const newPaginatedList = paginateArray(
        updatedList,
        pageRef.current,
        pageSizeRef.current,
      );
      setPaginatedStudents(newPaginatedList);

      return updatedList;
    });
  };

  // Manejar el estado de asistencia (cuando ha terminado la toma de asistencia)
  const handleAttendanceStatus = (message = `La asistencia a terminado en`) => {
    toast.success(`${message} ${currentCourse.name}`);

    removeAttendanceInProgress(currentCourse.id);
    setHasTakenAttendanceToday(true);
    const today = new Date().toLocaleDateString("sv-SE");
    const attendanceStatus = {
      date: today,
      taken: true,
      courseId: currentCourse.id,
    };
    setAttendanceStatus(attendanceStatus);
    stopAttendanceProcess();
    setExpiresIn(null);
    localStorage.removeItem("expiresIn");
  };

  // Iniciar conexión con SignalR
  const startConnection = (retries = 2) => {
    const updateStudentsStatus = (studentsWaiting) => {
      const waitingMap = new Map(
        studentsWaiting.map((s) => [s.studentId, s.status]),
      );

      const updated = allStudents.map((student) => {
        if (waitingMap.has(student.id)) {
          return {
            ...student,
            status: waitingMap.get(student.id),
          };
        }
        return student;
      });

      setAllStudents(updated);

      const paginated = paginateArray(updated, page, pageSize);
      setPaginatedStudents(paginated);
    };

    if (connection.state === "Disconnected") {
      connection
        .start()
        .then(() => {
          const courseId = currentCourse?.id;
          if (!courseId) {
            console.warn(
              "No se encontró un courseId válido para unirse al grupo",
            );
            return;
          }

          return connection
            .invoke("JoinCourseGroup", courseId)
            .then(() => {})
            .catch((invokeErr) =>
              console.error(
                "Error al unirse al grupo del curso:",
                invokeErr.message || invokeErr,
              ),
            );
        })
        .catch((err) => {
          console.error("Error al conectar con SignalR:", err.message || err);
          if (retries > 0) {
            setTimeout(() => startConnection(retries - 1), 3000);
          } else {
            console.warn(
              "No se pudo conectar a SignalR después de varios intentos",
            );
          }
        });
    } else {
      if (firstRequest) {
        const loadingToastId = toast.loading("Cargando estudiantes...");

        refetch()
          .then((result) => {
            const studentsWaiting = result.data.data.items;

            const allMarked = studentsWaiting.every(
              (s) => s.status === "PRESENT" || s.status === "NOT_PRESENT",
            );

            if (allMarked) {
              handleAttendanceStatus();
              updateStudentsStatus(studentsWaiting);
              return;
            }
            // En caso de que aún haya algunos en espera
            const waitingIds = new Set(studentsWaiting.map((s) => s.studentId));

            const updated = allStudents.map((student) => {
              // Si el studentId no está en el Set de los que están esperando...
              if (!waitingIds.has(student.id) && student.status === "WAITING") {
                // ...entonces devolvemos una copia del estudiante con su status cambiado a "PRESENT"
                return {
                  ...student,
                  status: "PRESENT",
                };
              }
              // Si sí estaba en studentsWaiting, entonces devolvemos al estudiante sin modificar
              return student;
            });

            setAllStudents(updated);

            const newPaginatedData = paginateArray(updated, page, pageSize);
            setPaginatedStudents(newPaginatedData);
          })
          .catch((error) => {
            console.error("Error al obtener los estudiantes:", error);
            toast.error("Ocurrió un error al cargar estudiantes.");
          })
          .finally(() => {
            toast.dismiss(loadingToastId);
          });
      }
    }
  };

  // ? Iniciar proceso de asistencia (Esta es la primera funcion en ejecutarse)
  const startAttendanceProcess = async () => {
    const courseId = currentCourse?.id;
    if (!courseId) {
      console.warn("No se encontró un curso actual.");
      return;
    }

    const body = {
      strictMode,
      courseId,
      homePlace: true,
      NewGeolocation: { x: 0, y: 0 },
      attendanceType: {
        email: otpChecked,
        qr: qrChecked,
      },
    };

    const toastId = toast.loading("Enviando solicitud de asistencia...");
    setIsLoading(true);
    try {
      const response = await takeAttendance(body);
      setExpiresIn(response.data.course.minimumAttendanceTime);
      // minimumAttendanceTime	7
      toast.dismiss(toastId);

      if (response.statusCode !== 200) {
        toast.error(response.message || "Error al enviar la solicitud");
        return;
      }

      const allStudentsFromResponse = Array.isArray(response.data.students)
        ? response.data.students
        : [];
      setAllStudents(allStudentsFromResponse);
      setQr(response.data.qr);
      const firstPage = paginateArray(allStudentsFromResponse, page, pageSize);
      setPaginatedStudents(firstPage);
      setStatus(true);
      toast.success(response.message);
      setAttendancesInProgress(currentCourse.id);

      startConnection();
      connection.off("UPDATE_ATTENDANCE_STATUS");
      connection.on("UPDATE_ATTENDANCE_STATUS", handleAttendanceUpdate);

      connection.onclose((error) => {
        console.error("La conexión se cerró:", error?.message || error);
      });
    } catch (error) {
      console.error("Error al enviar la solicitud:", error.message || error);
      toast.error("Error interno al iniciar asistencia.");
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  // Detener conexion con signalR
  const stopAttendanceProcess = () => {
    connection.off("UPDATE_ATTENDANCE_STATUS", handleAttendanceUpdate);
    connection.stop();
    // clearAttendanceState();
  };

  // ==================== RETORNO DEL HOOK ====================

  return {
    // Estados de control
    status,
    setStatus,
    qrChecked,
    setQrChecked,
    otpChecked,
    setOtpChecked,
    strictMode,
    setStrictMode,
    isAttendaceRequestLoading,

    // Datos de asistencia
    selectedMethods,
    allStudents,
    qr,

    // Métodos de asistencia
    startAttendanceProcess,
    stopAttendanceProcess,

    // Paginación
    paginatedStudents,
    pageSizeOptions,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,

    hasTakenAttendanceToday,
    expiresIn,
    clearAttendanceState,
  };
};
