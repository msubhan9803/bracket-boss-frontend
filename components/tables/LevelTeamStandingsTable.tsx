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
        <div className="text-center text-white font-semibold">{getValue()}</div>
      ),
    },
    {
      accessorKey: "pointsAgainst",
      header: "Points Against",
      cell: ({ getValue }) => (
        <div className="text-center text-white font-semibold">{getValue()}</div>
      ),
    },
    {
      accessorKey: "pointsScoredByNumberOfGames",
      header: "Points/Game Scored",
      cell: ({ getValue }) => (
        <div className="text-center text-white font-semibold">{getValue()}</div>
      ),
    },
    {
      accessorKey: "pointsAgainstByNumberOfGames",
      header: "Points/Game Against",
      cell: ({ getValue }) => (
        <div className="text-center text-white font-semibold">{getValue()}</div>
      ),
    },
    {
      accessorKey: "pointDiffByNumberOfGames",
      header: "Point Diff/Game",
      cell: ({ getValue }) => (
        <div className="text-center text-white font-semibold">{getValue()}</div>
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
    <div className="rounded-md border border-zinc-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-zinc-400 text-sm border-b border-zinc-800">
              <th colSpan={columns.length} className="py-2 px-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Team Standings</div>
                  <ColumnButton table={table} />
                </div>
              </th>
            </tr>
            <tr className="text-left text-zinc-400 text-sm border-b border-zinc-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} className="py-3 px-4">
                        <span
                          className="cursor-pointer flex items-center gap-1"
                          onClick={() => handleSort(header.column.id)}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}

                          {sort.field === header.column.id &&
                            (sort.direction === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </span>
                      </th>
                    );
                  })}
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {loadingLevelTeamStandings ? (
              Array(pageSize)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="border-b border-zinc-800">
                    {columns.map((column, columnIndex) => (
                      <td key={columnIndex} className="py-4 px-4">
                        <SkeletonLoader className="my-auto h-4" />
                      </td>
                    ))}
                  </tr>
                ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center py-4 px-4">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LevelTeamStandingsTable;
