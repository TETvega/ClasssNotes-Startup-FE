// Formatea una fecha en formato ISO a una fecha en español
export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return date.toLocaleDateString("es-Es", options);
};
