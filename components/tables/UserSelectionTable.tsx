"use client";
import { useEffect, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { User } from "@/graphql/generated/graphql";
import Pagination from "@/components/ui/pagination";
import { useTable } from "@/hooks/shared/useTable";
import FilterComponent from "@/components/core/FilterComponent";
import usePagination from "@/hooks/usePagination";
import { Checkbox } from "../ui/checkbox";

type Props = {
  users: User[];
  handleUsersSelection: (userIds: number[]) => void;
};

const UserSelectionTable = ({ users, handleUsersSelection }: Props) => {
  const {
    page,
    pageSize,
    pageSizes,
    filterBy,
    sort,
    selectedRows,
    paginatedData,
    setPage,
    setPageSize,
    setFilterBy,
    setFilter,
    setSort,
    setSelectedRows,
  } = usePagination(users);

  const { handleSort, getTotalPages, handlePrevBtn, handleNextBtn } = useTable(
    setPage,
    sort,
    setSort
  );

  const usersList = useMemo<Partial<User>[]>(() => [...users], [users]);

  const isAllSelected =
    usersList.length > 0 && selectedRows.size === usersList.length;
  const isSomeSelected =
    selectedRows.size > 0 && selectedRows.size < usersList.length;

  const columns: ColumnDef<Partial<User>, any>[] = [
    {
      accessorKey: "select",
      header: () => (
        <Checkbox
          checked={isAllSelected}
          ref={(input: any) => {
            if (input) input.indeterminate = isSomeSelected;
          }}
          onCheckedChange={(isChecked) => {
            setSelectedRows(
              isChecked ? new Set(usersList.map((user) => user.id)) : new Set()
            );
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedRows.has(row.original.id)}
          onCheckedChange={(isChecked) => {
            setSelectedRows((prevSelected) => {
              const updatedSelected = new Set(prevSelected);
              if (isChecked) {
                updatedSelected.add(row.original.id);
              } else {
                updatedSelected.delete(row.original.id);
              }
              return updatedSelected;
            });
          }}
        />
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
  ];

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    handleUsersSelection(Array.from(selectedRows).map(Number));
  }, [selectedRows]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-none !hover:bg-none">
          <TableRow>
            <TableHead
              className="px-1 hover:bg-transparent"
              colSpan={columns.length}
            >
              <div className="flex justify-between w-full py-1">
                <FilterComponent
                  columns={
                    columns.filter(
                      (col: any) => !["select"].includes(col.accessorKey)
                    ) as {
                      header: string;
                      accessorKey: string;
                    }[]
                  }
                  filterBy={filterBy}
                  setFilterBy={setFilterBy}
                  setFilter={(value: string) => {
                    setFilter(value.trim());
                  }}
                />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    onClick={() => handleSort(header.column.id)}
                  >
                    <span className="cursor-pointer flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {sort.field === header.column.id &&
                        (sort.direction === "ASC" ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        ))}
                    </span>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}

          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={selectedRows.has(row.original.id) && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div className="flex justify-end">
                <Pagination
                  page={page}
                  totalPages={getTotalPages(pageSize, users.length)}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  pageSizes={pageSizes}
                  handlePrevBtn={handlePrevBtn}
                  handleNextBtn={handleNextBtn}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default UserSelectionTable;
