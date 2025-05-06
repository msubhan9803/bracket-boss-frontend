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
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { Court, LevelTeamStanding } from "@/graphql/generated/graphql";
import SkeletonLoader from "@/components/ui/skeleton";
import Pagination from "@/components/ui/pagination";
import { useTable } from "@/hooks/shared/useTable";
import FilterComponent from "@/components/core/FilterComponent";
import AddCourtButton from "../mutation-buttons/AddCourtButton";
import ManageCourtDrawer from "../drawers/ManageCourtDrawer";
import useCourtOperations from "@/hooks/court/useCourtOperations";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useLevelTeamStandingsByLevelId from "@/hooks/level/useLevelTeamStandingsByLevelId";

const LevelTeamStandingsTable = ({ levelId }: { levelId: string }) => {
  const [page, setPage] = useState(1);
  const pageSizes = [5, 10, 25];
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [filterBy, setFilterBy] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ field: "id", direction: "ASC" });
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { handleSort, getTotalPages, handlePrevBtn, handleNextBtn } = useTable(
    setPage,
    sort,
    setSort
  );

  const { levelTeamStandings, loadingLevelTeamStandings, refetchLevelTeamStandings } = useLevelTeamStandingsByLevelId({
    levelId,
    enabled: !!levelId,
  });

  const columns: ColumnDef<Partial<LevelTeamStanding>, any>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "team.name",
      header: "Team",
    },
    {
      accessorKey: "wins",
      header: "Wins",
    },
    {
      accessorKey: "losses",
      header: "Losses",
    },
    {
      accessorKey: "pointsScoredByNumberOfGames",
      header: "Points Scored by # of Games",
    },
    {
      accessorKey: "pointsAgainstByNumberOfGames",
      header: "Points Against by # of Games",
    },
    {
      accessorKey: "pointDiffByNumberOfGames",
      header: "Point Diff by # of Games",
    },
  ];

  const table = useReactTable({
    data: levelTeamStandings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    refetchLevelTeamStandings();
  }, [pageSize, sort, filterBy, filter, page]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableBody>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className=" bg-muted/80 hover:bg-muted/80">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} onClick={() => handleSort(header.column.id)}>
                    <span className="cursor-pointer flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}

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

          {loadingLevelTeamStandings ? (
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
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
      </Table>
    </div>
  );
};

export default LevelTeamStandingsTable;
