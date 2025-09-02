import { useState, useEffect } from "react";

// Simulación de datos del backend
const mockBackendData = [
  { id: "1", title: "Configuración 1", content: "Contenido 1" },
  { id: "2", title: "Configuración 2", content: "Contenido 2" },
  { id: "3", title: "Configuración 3", content: "Contenido 3" },
  {
    id: "961e82fe-5808-4f48-60a4-08dd6828ae48",
    title: "Introducción a la programación en UNAH",
    content:
      "Esta es una nota sobre los conceptos básicos de programación en UNAH.",
    registrationDate: "2025-03-02T10:00:00",
    useDate: "2025-03-10T12:00:00",
  },
];

// Hook simulado
export const useGetCourseSetting = () => {
  const [configuraciones, setConfiguraciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await new Promise((resolve) => {
          setTimeout(() => resolve(mockBackendData), 1000);
        });
        setConfiguraciones(response);
      } catch (err) {
        setError("Error al cargar los datos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { configuraciones, loading, error };
};
