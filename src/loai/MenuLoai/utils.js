export function calculatePaginationRange(
  currentPage,
  itemsPerPage,
  totalItems
) {
  const startRange = (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalItems);
  return { start: startRange, end: endRange };
}
