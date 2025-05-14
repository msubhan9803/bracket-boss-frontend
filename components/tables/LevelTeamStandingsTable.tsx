"use client";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  OnChangeFn,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LevelTeamStanding } from "@/graphql/generated/graphql";
import SkeletonLoader from "@/components/ui/skeleton";
import { useTable } from "@/hooks/shared/useTable";
import useLevelTeamStandingsByLevelId from "@/hooks/level/useLevelTeamStandingsByLevelId";
import TeamAvatar from "../scheduling/scoring/TeamAvatar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FilterComponent from "../core/FilterComponent";
import ColumnButton from "../ColumnButton";

const LevelTeamStandingsTable = ({ levelId }: { levelId: string }) => {
  const [page, setPage] = useState(1);
  const pageSizes = [5, 10, 25];
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [filterBy, setFilterBy] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ field: "id", direction: "ASC" });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    pointsScored: true,
    pointsAgainst: true,
    pointsScoredByNumberOfGames: true,
    pointsAgainstByNumberOfGames: true,
    pointDiffByNumberOfGames: true,
  });

  const { handleSort, getTotalPages, handlePrevBtn, handleNextBtn } = useTable(
    setPage,
    sort,
    setSort
  );

  const { levelTeamStandings, loadingLevelTeamStandings, refetchLevelTeamStandings } =
    useLevelTeamStandingsByLevelId({
      levelId,
      enabled: !!levelId,
    });

  const columns: ColumnDef<Partial<LevelTeamStanding>, any>[] = [
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => {
        const rank = row.index + 1;
        return (
          <div className="flex items-center">
            <span
              className={`${
                rank <= 3 ? "text-green-500 font-semibold" : "text-zinc-400"
              }`}
            >
              #{rank}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "team",
      header: "Team",
      cell: ({ row }) => {
        const team = row.original.team;
        const rank = row.index + 1;
        return (
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1 sm:-space-x-2">
              {team?.users?.slice(0, 3).map((user) => (
                <TeamAvatar key={user.id} user={user} />
              ))}
              {team?.users && team?.users?.length > 3 && (
                <Avatar
                  className={`border-2 border-white w-8 h-8 sm:w-10 sm:h-10 bg-primary text-primary-foreground text-xs sm:text-sm`}
                >
                  <AvatarFallback>+{team.users.length - 3}</AvatarFallback>
                </Avatar>
              )}
            </div>

            <span className="text-xs sm:text-sm font-medium text-foreground truncate max-w-[80px] sm:max-w-[100px]">
              {team?.name ?? "Team"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "wins",
      header: "W",
      cell: ({ getValue }) => (
        <div className="text-center text-green-500 font-medium">{getValue()}</div>
      ),
    },
    {
      accessorKey: "losses",
      header: "L",
      cell: ({ getValue }) => (
        <div className="text-center text-red-500 font-medium">{getValue()}</div>
      ),
    },
    {
      accessorKey: "pointsScored",
      header: "Points Scored",
      cell: ({ getValue }) => (
        <div className="text-center font-semibold">{getValue()}</div>
      ),
    },
    {
      accessorKey: "pointsAgainst",
      header: "Points Against",
      cell: ({ getValue }) => (
        <div className="text-center font-semibold">{getValue()}</div>
      ),
    },
    {
      accessorKey: "pointsScoredByNumberOfGames",
      header: "Points/Game Scored",
      cell: ({ getValue }) => (
        <div className="text-center font-semibold">{getValue()}</div>
      ),
    },
    {
      accessorKey: "pointsAgainstByNumberOfGames",
      header: "Points/Game Against",
      cell: ({ getValue }) => (
        <div className="text-center font-semibold">{getValue()}</div>
      ),
    },
    {
      accessorKey: "pointDiffByNumberOfGames",
      header: "Point Diff/Game",
      cell: ({ getValue }) => (
        <div className="text-center font-semibold">{getValue()}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: levelTeamStandings,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility as OnChangeFn<VisibilityState>,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    refetchLevelTeamStandings();
  }, [pageSize, sort, filterBy, filter, page]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-none !hover:bg-none">
          <TableRow>
            <TableHead className="px-1 hover:bg-transparent" colSpan={columns.length}>
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
                <ColumnButton table={table} />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
