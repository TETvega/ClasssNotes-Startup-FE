import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useCodeInput } from "../../auth/hooks";
import { checkInByOtp } from "../../../shared/actions";

export const useCheckIn = () => {
  const { code, inputRefs, handleInputChange, handleKeyDown, handlePaste } = useCodeInput();
  const navigate = useNavigate();
  const locationHook = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [geoPermission, setGeoPermission] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [areParams, setAreParams] = useState(null);

  const isValid = code.join("").length === 6;

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        { enableHighAccuracy: true },
      );
    });
  };

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Tu navegador no soporta geolocalización.");
      return null;
    }

    try {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: "geolocation",
          });
          setGeoPermission(permissionStatus.state);

          if (permissionStatus.state === "denied") {
            toast.error("Permiso de geolocalización denegado.");
            return null;
          }
        } catch (permError) {
          console.warn(
            "No se pudo consultar permisos de geolocalización:",
            permError,
          );
        }
      }

      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      return { latitude, longitude };
    } catch (error) {
      toast.error("No se pudo obtener tu ubicación.", error);
      return null;
    }
  };

  const handleClick = async () => {
    setIsLoading(true);

    if (!isValid) {
      toast.error("Código inválido. Debe tener 6 dígitos.");
      setIsLoading(false);
      return;
    }

    const coords = await handleGetLocation();

    if (!coords) {
      toast.error(
        "Ubicación no disponible. Intenta nuevamente refrescando la pagina actual.",
      );
      setIsLoading(false);
      return;
    }

    const body = {
      email,
      OTP: code.join(""),
      courseId,
      x: coords.longitude,
      y: coords.latitude,
    };

    try {
      const result = await checkInByOtp(body);

      if (result.statusCode !== 200) {
        toast.error(result.message || "Error al registrar asistencia.");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      toast.success("Asistencia registrada con éxito.");
      navigate("/check-in/success");
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        "Ocurrió un error inesperado. Intenta más tarde.";
      toast.error(backendMessage);
      console.error("Error al registrar asistencia:", error);
    }

    setIsLoading(false);
  };

  // Cargar email y courseId desde la URL al montar
  useEffect(() => {
    const queryParams = new URLSearchParams(locationHook.search);
    const emailParam = queryParams.get("email");
    const courseIdParam = queryParams.get("courseId");

    if (emailParam && courseIdParam) {
      setEmail(emailParam);
      setCourseId(courseIdParam);
    } else {
      setAreParams(false);
      navigate("/");
      console.error("Faltan parámetros en la URL.");
    }
  }, [locationHook.search]);

  return {
    code,
    inputRefs,
    navigate,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    handleClick,
    location,
    geoPermission,
    handleGetLocation,
    isValid,
    isLoading,
    isSuccess,
    areParams,
  };
};
