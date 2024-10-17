"use client";
import { useEffect, useMemo, useState } from "react";
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
import moment from "moment";
import { Tournament } from "@/graphql/generated/graphql";
import SkeletonLoader from "@/components/ui/skeleton";
import Pagination from "@/components/ui/pagination";
import { useTable } from "@/hooks/shared/useTable";
import useTournaments from "@/hooks/tournament/useTournaments";
import FilterComponent from "@/components/core/FilterComponent";
import { toTitleCase } from "@/lib/utils";
import AddTournamentButton from "@/components/mutation-buttons/AddTournamentButton";

const TournamentListTable = () => {
  const [page, setPage] = useState(1);
  const pageSizes = [5, 10, 25];
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [filterBy, setFilterBy] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ field: "id", direction: "ASC" });

  const { handleSort, getTotalPages, handlePrevBtn, handleNextBtn } = useTable(
    setPage,
    sort,
    setSort
  );

  const {
    tournamentListFetched,
    totalRecords,
    loadingOrder,
    refetchTournamentList,
  } = useTournaments(page, pageSize, filterBy, filter, sort);

  const tournamentList = useMemo<Partial<Tournament>[]>(
    () => [...tournamentListFetched],
    [tournamentListFetched]
  );

  const columns: ColumnDef<Partial<Tournament>, any>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "bracket.name",
      header: "Bracket",
      cell: ({ getValue }) => <div>{toTitleCase(getValue())}</div>,
    },
    {
      accessorKey: "club.name",
      header: "Club Name",
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: ({ getValue }) => <div>{moment(getValue()).format("ll")}</div>,
    },
    {
      accessorKey: "end_date",
      header: "End Date",
      cell: ({ getValue }) => <div>{moment(getValue()).format("ll")}</div>,
    },

    {
      accessorKey: "isPrivate",
      header: "Private",
      cell: ({ getValue }) => <div>{getValue() ? "Yes" : "No"}</div>,
    },
  ];

  const table = useReactTable({
    data: tournamentList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    refetchTournamentList();
  }, [pageSize, sort, filterBy, filter, page]);

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
                    columns as {
                      header: string;
                      accessorKey: string;
                    }[]
                  }
                  filterBy={filterBy}
                  setFilterBy={setFilterBy}
                  setFilter={setFilter}
                />

                <AddTournamentButton
                  refetchTournamentList={refetchTournamentList}
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
                        (sort.direction === "asc" ? (
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

          {loadingOrder ? (
            Array(pageSize)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex}>
                      <SkeletonLoader className="my-auto" height="3" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
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
                  totalPages={getTotalPages(pageSize, totalRecords)}
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

export default TournamentListTable;
