import { useState, useMemo } from "react";

interface Sort {
  field: string;
  direction: "ASC" | "DESC";
}

const usePagination = <T>(
  items: T[],
  initialSortField: keyof T = "id" as keyof T
) => {
  const [page, setPage] = useState(1);
  const pageSizes = [5, 10, 25];
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [filterBy, setFilterBy] = useState<keyof T | "">("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<Sort>({
    field: initialSortField as string,
    direction: "ASC",
  });
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleFilterChange = (newFilterBy: keyof T | "", newFilter: string) => {
    setFilterBy(newFilterBy);
    setFilter(newFilter);
    setPage(1);
  };

  const handleSortChange = (newSort: Sort) => {
    setSort(newSort);
    setPage(1);
  };

  const paginatedData = useMemo(() => {
    let filteredData = items;

    if (filterBy && filter) {
      filteredData = filteredData.filter((item) => {
        const value = item[filterBy];
        return value != null && value.toString().includes(filter);
      });
    }

    if (sort.field) {
      filteredData = filteredData.sort((a, b) => {
        if (a[sort.field as keyof T] < b[sort.field as keyof T]) {
          return sort.direction === "ASC" ? -1 : 1;
        }
        if (a[sort.field as keyof T] > b[sort.field as keyof T]) {
          return sort.direction === "ASC" ? 1 : -1;
        }
        return 0;
      });
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [items, page, pageSize, filterBy, filter, sort]);

  return {
    page,
    pageSize,
    pageSizes,
    filterBy,
    filter,
    sort,
    selectedRows,
    paginatedData,
    setPage: handlePageChange,
    setPageSize: handlePageSizeChange,
    setFilterBy,
    setFilter,
    setSort: handleSortChange,
    setSelectedRows,
  };
};

export default usePagination;
