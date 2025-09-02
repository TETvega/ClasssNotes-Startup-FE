import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { reportInitValues, reportValidationSchema } from "../forms";

export const useGenerateReportForm = ({
  students = [],
  statistics = {},
  courseId,
  onClose,
}) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  // Determinar las unidades disponibles
  const getUnits = () => {
    const units = new Set();
    students.forEach((student) => {
      Object.keys(student.grades || {}).forEach((key) => {
        if (key.startsWith("unidad")) {
          units.add(key);
        }
      });
    });
    return Array.from(units).sort((a, b) => {
      const numA = parseInt(a.replace("unidad", ""));
      const numB = parseInt(b.replace("unidad", ""));
      return numA - numB;
    });
  };

  const units = getUnits();

  // Validación del formulario con Formik
  const formik = useFormik({
    initialValues: reportInitValues,
    validationSchema: reportValidationSchema,
    onSubmit: async (values) => {
      // Validar que haya estudiantes
      if (students.length === 0) {
        toast.error("No hay estudiantes disponibles para generar el reporte.");
        setIsPending(false);
        return;
      }

      const toastId = toast.loading("Generando reporte...");
      setIsPending(true);

      try {
        if (values.format === "pdf") {
          // Generar PDF
          const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
          });

          // Configuración de colores y fuentes
          const primaryColor = [22, 160, 133];
          const secondaryColor = [44, 62, 80];
          const textColor = [33, 33, 33];
          doc.setFont("helvetica", "normal");

          // Contenido
          let yOffset = 20;

          // Título principal
          doc.setFontSize(20);
          doc.setTextColor(...secondaryColor);
          doc.setFont("helvetica", "bold");
          doc.text("Reporte del curso", 105, yOffset, { align: "center" });
          yOffset += 8;

          doc.setDrawColor(...primaryColor);
          doc.setLineWidth(0.5);
          doc.line(20, yOffset, 190, yOffset);
          yOffset += 10;

          // Estadísticas generales
          doc.setFontSize(16);
          doc.setTextColor(...secondaryColor);
          doc.setFont("helvetica", "bold");
          doc.text("Estadísticas Generales", 20, yOffset);
          yOffset += 8;

          doc.setDrawColor(...primaryColor);
          doc.line(20, yOffset, 190, yOffset);
          yOffset += 10;

          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);
          doc.setTextColor(...textColor);
          doc.text(
            `Promedio General: ${(statistics.overallAvarage || 0).toFixed(1)}`,
            20,
            yOffset,
          );
          yOffset += 8;
          doc.text(
            `Tasa de Aprobación: ${(statistics.approvalRating || 0).toFixed(1)}%`,
            20,
            yOffset,
          );
          yOffset += 8;
          doc.text(
            `Mejor Unidad: Unidad ${statistics.bestUnit?.unitNumber || "N/A"} (Promedio: ${(statistics.bestUnit?.avarage || 0).toFixed(1)})`,
            20,
            yOffset,
          );
          yOffset += 8;
          doc.text(
            `Peor Unidad: Unidad ${statistics.worstUnit?.unitNumber || "N/A"} (Promedio: ${(statistics.worstUnit?.avarage || 0).toFixed(1)})`,
            20,
            yOffset,
          );
          yOffset += 15;

          // Distribución de calificaciones
          doc.setFontSize(16);
          doc.setTextColor(...secondaryColor);
          doc.setFont("helvetica", "bold");
          doc.text("Distribución de calificaciones", 20, yOffset);
          yOffset += 8;

          doc.setDrawColor(...primaryColor);
          doc.line(20, yOffset, 190, yOffset);
          yOffset += 10;

          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);
          const graficResult = statistics.graficResult || {};
          Object.entries(graficResult).forEach(([key, value]) => {
            if (key !== "bigTotal") {
              const label =
                key === "excellentTotal"
                  ? "Excelente"
                  : key === "goodTotal"
                    ? "Bueno"
                    : key === "stablishTotal"
                      ? "Estable"
                      : key === "lowTotal"
                        ? "Bajo"
                        : "Reprobado";
              const percentage = (
                (value / (graficResult.bigTotal || 1)) *
                100
              ).toFixed(1);
              doc.text(`${label}: ${percentage}%`, 20, yOffset);
              yOffset += 8;
            }
          });
          yOffset += 10;

          // Calificaciones por estudiante
          doc.setFontSize(16);
          doc.setTextColor(...secondaryColor);
          doc.setFont("helvetica", "bold");
          doc.text("Calificaciones por estudiante", 20, yOffset);
          yOffset += 8;

          doc.setDrawColor(...primaryColor);
          doc.line(20, yOffset, 190, yOffset);
          yOffset += 10;

          // Tabla de estudiantes
          const headers = [
            "Estudiante",
            ...units.map((unit) => `Unidad ${unit.replace("unidad", "")}`),
            "Promedio",
            "Estado",
          ];
          const tableData = students.map((student) => [
            student.name || "N/A",
            ...units.map((unit) =>
              Number(student.grades?.[unit] || 0).toFixed(1),
            ),
            Number(student.average || 0).toFixed(1),
            student.status || "N/A",
          ]);

          // Generar tabla
          autoTable(doc, {
            startY: yOffset,
            head: [headers],
            body: tableData,
            theme: "grid",
            styles: {
              fontSize: 10,
              cellPadding: 3,
              textColor: textColor,
              lineColor: [200, 200, 200],
            },
            headStyles: {
              fillColor: primaryColor,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              halign: "center",
            },
            alternateRowStyles: {
              fillColor: [245, 245, 245],
            },
            columnStyles: {
              0: { cellWidth: 60 },
            },
            margin: { top: 20, left: 20, right: 20 },
          });

          // Guardar el PDF
          doc.save(`Reporte_Curso_${courseId}.pdf`);
          toast.success("Reporte PDF generado exitosamente");
          onClose();
        } else {
          // Generar Excel
          const workbook = XLSX.utils.book_new();

          // Hoja de estadísticas
          const statsData = [
            ["Estadísticas Generales"],
            ["Promedio General", (statistics.overallAvarage || 0).toFixed(1)],
            [
              "Tasa de Aprobación",
              `${(statistics.approvalRating || 0).toFixed(1)}%`,
            ],
            [
              "Mejor Unidad",
              `Unidad ${statistics.bestUnit?.unitNumber || "N/A"} (Promedio: ${(statistics.bestUnit?.avarage || 0).toFixed(1)})`,
            ],
            [
              "Peor Unidad",
              `Unidad ${statistics.worstUnit?.unitNumber || "N/A"} (Promedio: ${(statistics.worstUnit?.avarage || 0).toFixed(1)})`,
            ],
            [],
            ["Distribución de Calificaciones"],
            ...Object.entries(statistics.graficResult || {})
              .map(([key, value]) => {
                if (key !== "bigTotal") {
                  const label =
                    key === "excellentTotal"
                      ? "Excelente"
                      : key === "goodTotal"
                        ? "Bueno"
                        : key === "stablishTotal"
                          ? "Estable"
                          : key === "lowTotal"
                            ? "Bajo"
                            : "Reprobado";
                  const percentage = (
                    (value / (statistics.graficResult?.bigTotal || 1)) *
                    100
                  ).toFixed(1);
                  return [label, `${percentage}%`];
                }
                return null;
              })
              .filter(Boolean),
          ];

          const statsSheet = XLSX.utils.aoa_to_sheet(statsData);
          statsSheet["A1"].s = { font: { bold: true, sz: 14 } };
          statsSheet["A7"].s = { font: { bold: true, sz: 14 } };
          XLSX.utils.book_append_sheet(workbook, statsSheet, "Estadísticas");

          // Hoja de estudiantes
          const studentHeaders = [
            "Estudiante",
            ...units.map((unit) => `Unidad ${unit.replace("unidad", "")}`),
            "Promedio",
            "Estado",
          ];
          const studentData = students.map((student) => [
            student.name || "N/A",
            ...units.map((unit) =>
              Number(student.grades?.[unit] || 0).toFixed(1),
            ),
            Number(student.average || 0).toFixed(1),
            student.status || "N/A",
          ]);

          // Crear la hoja de estudiantes
          const studentSheet = XLSX.utils.aoa_to_sheet([
            studentHeaders,
            ...studentData,
          ]);

          studentHeaders.forEach((_, index) => {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
            studentSheet[cellAddress].s = {
              font: { bold: true, sz: 12 },
              fill: { fgColor: { rgb: "D3D3D3" } },
              alignment: { horizontal: "center", vertical: "center" },
            };
          });

          // Ajustar el ancho de las columnas
          const colWidths = studentHeaders.map((header, index) => ({
            wch: index === 0 ? 30 : 15,
          }));
          studentSheet["!cols"] = colWidths;

          // Definir la tabla
          const range = {
            s: { c: 0, r: 0 },
            e: { c: studentHeaders.length - 1, r: studentData.length },
          };
          studentSheet["!ref"] = XLSX.utils.encode_range(range);

          const table = {
            name: "CalificacionesEstudiantes",
            ref: XLSX.utils.encode_range(range),
            headerRow: true,
            totalsRow: false,
            style: {
              theme: "TableStyleMedium2",
              showRowStripes: true,
            },
            columns: studentHeaders.map((header) => ({ name: header })),
            rows: studentData.map(() => ({})),
          };

          if (!studentSheet["!tables"]) studentSheet["!tables"] = [];
          studentSheet["!tables"].push(table);

          XLSX.utils.book_append_sheet(workbook, studentSheet, "Estudiantes");

          // Guardar el Excel
          XLSX.writeFile(
            workbook,
            `Reporte_Curso_${courseId || "unknown"}.xlsx`,
          );
          toast.success("Reporte Excel generado exitosamente");
          onClose();
        }
      } catch (error) {
        toast.error(
          "Error al generar el reporte. Por favor, inténtelo de nuevo.",
          error,
        );
      } finally {
        toast.dismiss(toastId);
        setIsPending(false);
      }
    },
  });

  return {
    navigate,
    setIsPending,
    formik,
    isPending,
  };
};
