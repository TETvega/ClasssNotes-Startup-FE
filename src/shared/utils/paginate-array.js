// Función para paginar un array de objetos
export const paginateArray = (
  array,
  currentPage = 1,
  pageSize = 10,
  searchTerm = "",
) => {
  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Filtrar por searchTerm si se proporciona
  const filteredArray = searchTerm
    ? array.filter((item) =>
        [item.firstName, item.lastName, item.email].some((field) =>
          normalizeText(field).includes(normalizeText(searchTerm)),
        ),
      )
    : array;

  const totalItems = filteredArray.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const items = filteredArray.slice(start, end);

  return {
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    items,
  };
};
