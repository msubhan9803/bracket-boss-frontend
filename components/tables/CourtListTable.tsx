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
import { Court } from "@/graphql/generated/graphql";
import SkeletonLoader from "@/components/ui/skeleton";
import Pagination from "@/components/ui/pagination";
import { useTable } from "@/hooks/shared/useTable";
import useCourts from "@/hooks/court/useCourts";
import FilterComponent from "@/components/core/FilterComponent";
import AddCourtButton from "../mutation-buttons/AddCourtButton";
import ManageCourtDrawer from "../drawers/ManageCourtDrawer";
import useCourtOperations from "@/hooks/court/useCourtOperations";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CourtListTable = () => {
  const clubId = useSelector((state: RootState) => state.user.clubId) as number;
  const [page, setPage] = useState(1);
  const pageSizes = [5, 10, 25];
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [filterBy, setFilterBy] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ field: "id", direction: "ASC" });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditingCourt, setCurrentEditingCourt] = useState<Partial<Court>>();

  const { handleSort, getTotalPages, handlePrevBtn, handleNextBtn } = useTable(
    setPage,
    sort,
    setSort
  );

  const { courtListFetched, totalRecords, loadingOrder, refetchCourtList } =
    useCourts(page, pageSize, filterBy, filter, sort);

  const { upsertCourtMutation } = useCourtOperations();

  const handleEditOpen = (court: Partial<Court>) => {
    setCurrentEditingCourt(court)
    setEditModalOpen(true)
  }

  const handleEdit = async (courtId: number | undefined, values: any) => {
    await upsertCourtMutation.mutateAsync({
      ...values,
      clubId,
      dailySchedule: values.dailySchedule.map((schedule: any) => ({
        day: schedule.day,
        scheduleTimings: schedule.scheduleTimings.map((timing: any) => {
          const timingData: any = {
            startTime: timing.startTime,
            endTime: timing.endTime,
          };
          if (typeof timing.id === "number") {
            timingData.id = timing.id;
          }
          return timingData;
        }),
      })),
      courtId: courtId ?? undefined,
    });
    refetchCourtList();
    setEditModalOpen(false);
  };

  const courtList = useMemo<Partial<Court>[]>(
    () => [...courtListFetched],
    [courtListFetched]
  );

  const columns: ColumnDef<Partial<Court>, any>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      id: 'actions',
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <Pencil size={18} className='cursor-pointer' onClick={() => handleEditOpen(row.original)} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: courtList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    refetchCourtList();
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

                <AddCourtButton refetchCourtList={refetchCourtList} />
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

      {editModalOpen && <ManageCourtDrawer editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} item={currentEditingCourt as Partial<Court>} onUpdate={handleEdit} submitButtonLoading={upsertCourtMutation.isPending} />}
    </div>
  );
};

export default CourtListTable;
