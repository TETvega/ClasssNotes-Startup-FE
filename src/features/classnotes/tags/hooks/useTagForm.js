import { useEffect, useRef, useState } from "react";

export const useTagForm = (formik) => {
  // Colores predefinidos
  const predefinedColors = [
    "ef4444", // Rojo
    "3b82f6", // Azul
    "10b981", // Verde
    "8b5cf6", // Púrpura
    "f59e0b", // Naranja
    "ec4899", // Rosa
  ];

  // Estado para manejar la selección de iconos y colores
  const [selectedIcon, setSelectedIcon] = useState(formik.values.icon || "");
  const [selectedColor, setSelectedColor] = useState(
    formik.values.colorHex || predefinedColors[0],
  );

  // Estado para mostrar/ocultar el selector de color
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);

  // Mapeo de iconos a nombres más amigables
  const iconLabels = {
    doc: "Documento",
    book: "Libro",
    message: "Mensaje",
    project: "Proyecto",
    flask: "Laboratorio",
    completed: "Completado",
    forum: "Discurso",
    presentation: "Presentación",
    star: "Extra",
    award: "Premio",
    travel: "Viaje",
    tasks: "Tarea",
    question: "Pregunta",
    movies: "Película",
    content: "Contenido",
  };

  // Lista de iconos disponibles
  const availableIcons = [
    "doc",
    "book",
    "message",
    "project",
    "flask",
    "completed",
    "forum",
    "presentation",
    "star",
    "award",
    "travel",
    "tasks",
    "question",
    "movies",
    "content",
  ];

  // Manejar la selección de un icono
  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  // Manejar la selección de un color predefinido
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  // Manejar cambio manual del color hexadecimal
  const handleColorChange = (e) => {
    const color = e.target.value.replace("#", "");
    setSelectedColor(color);
  };

  // Actualizar formik cuando cambian las selecciones
  useEffect(() => {
    if (formik.values.icon !== selectedIcon) {
      formik.setFieldValue("icon", selectedIcon);
    }
  }, [selectedIcon]);

  useEffect(() => {
    if (formik.values.colorHex !== selectedColor) {
      formik.setFieldValue("colorHex", selectedColor);
    }
  }, [selectedColor]);

  // Detectar clics fuera del selector de color y cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  return {
    selectedIcon,
    selectedColor,
    iconLabels,
    availableIcons,
    predefinedColors,
    showColorPicker,
    colorPickerRef,
    setShowColorPicker,
    handleIconSelect,
    handleColorSelect,
    handleColorChange,
  };
};
