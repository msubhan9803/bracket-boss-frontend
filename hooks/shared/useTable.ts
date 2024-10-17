interface Sort {
  field: string;
  direction: "ASC" | "DESC";
}

export function useTable(
  setPage: any,
  sort: {
    field: string;
    direction: string;
  },
  setSort: (newSort: Sort) => void
) {
  const handleSort = (field: string) => {
    let direction: "ASC" | "DESC" = "ASC";
    if (sort.field === field && sort.direction === "ASC") {
      direction = "DESC";
    }
    setSort({ field, direction });
  };

  const getTotalPages = (pageSize: number, totalRecords: number) => {
    return pageSize > totalRecords ? 1 : Math.ceil(totalRecords / pageSize);
  };

  const handleNextBtn = () => {
    setPage((prev: number) => prev + 1);
  };

  const handlePrevBtn = () => {
    setPage((prev: number) => prev - 1);
  };

  const _getFilterableColumns = (
    columns: { header: string; accessorKey: string }[],
    unfilterableColumns: string[]
  ) => {
    return columns.filter(
      (column) => !unfilterableColumns.includes(column.accessorKey)
    );
  };

  return {
    handleSort,
    getTotalPages,
    handlePrevBtn,
    handleNextBtn,
    _getFilterableColumns,
  };
}
