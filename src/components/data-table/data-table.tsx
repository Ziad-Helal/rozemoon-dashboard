import { ColumnFiltersState, flexRender, getCoreRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable_Skeleton, DataTableFooter, DataTableHeader } from "./components";
import { Column, Filter } from "@/types/table-types";
import { useColumnsBuilder } from "./columns-builder";
import { Dispatch, SetStateAction } from "react";
import { cn, getPinningStyles } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface DataTableProps<TData, TActions> {
  columnsDefinition: Column<TActions>[];
  sortingState: SortingState;
  filtersState: ColumnFiltersState;
  setSortingState: Dispatch<SetStateAction<SortingState>>;
  setFiltersState: Dispatch<SetStateAction<ColumnFiltersState>>;
  data?: TData[];
  searchableColumns?: string[];
  filters?: Filter[];
  isLoading?: boolean;
}

export default function DataTable<TData, TActions>({
  columnsDefinition,
  data,
  searchableColumns,
  filters,
  isLoading,
  sortingState,
  filtersState,
  setSortingState,
  setFiltersState,
}: DataTableProps<TData, TActions>) {
  const { i18n, t } = useTranslation();
  const columns = useColumnsBuilder(columnsDefinition);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: (sorting) => {
      setSortingState(sorting);
    },
    onColumnFiltersChange: (filter) => {
      setFiltersState(filter);
    },
    manualPagination: true,
    state: {
      sorting: sortingState,
      columnFilters: filtersState,
      columnPinning: {
        left: ["select", "id"],
        right: ["actions"],
      },
    },
  });
  const tableRowModel = data?.length ? table.getRowModel().rows : [];

  return (
    <div className="[&>div:nth-child(2)]:rounded-md [&>div:nth-child(2)]:border">
      <DataTableHeader table={table} columnsDefinition={columnsDefinition} searchableColumns={searchableColumns} filters={filters} />
      {isLoading && !data?.length ? (
        <DataTable_Skeleton columnsCount={table.getVisibleFlatColumns().length} />
      ) : (
        <>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="relative">
                  {headerGroup.headers
                    .filter(({ column }) => !(column.columnDef.meta as { hidden?: boolean })?.hidden)
                    .map(({ id, column, isPlaceholder, getContext }) => {
                      const pinPosition = column.getIsPinned();
                      const pinOffset = [0, 32][column.getPinnedIndex()];
                      const { className, styles } = getPinningStyles(i18n.dir(), pinPosition, pinOffset);
                      return (
                        <TableHead key={id} className={cn("[&:last-child]:px-2 sticky top-0", className)} style={styles}>
                          {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
                        </TableHead>
                      );
                    })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {tableRowModel?.length ? (
                tableRowModel.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row
                      .getVisibleCells()
                      .filter(({ column }) => !(column.columnDef.meta as { hidden?: boolean })?.hidden)
                      .map(({ id, column, getContext }) => {
                        const pinPosition = column.getIsPinned();
                        const pinOffset = [0, 32][column.getPinnedIndex()];
                        const { className, styles } = getPinningStyles(i18n.dir(), pinPosition, pinOffset);
                        const columnType = columnsDefinition.find(({ accessorKey }) => accessorKey == column.id)?.type;
                        return (
                          <TableCell
                            key={id}
                            className={cn(
                              "[&:not(:first-child)]:ps-6 last:!ps-2 last:w-1 first:w-1 [&:nth-child(2)]:w-1 max-w-sm text-ellipsis line-clamp-1 table-cell",
                              columnType == "link" || columnType == "actions" ? "py-0" : "",
                              className
                            )}
                            style={styles}
                          >
                            {flexRender(column.columnDef.cell, getContext())}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {t("tablePages.empty")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <DataTableFooter table={table} />
        </>
      )}
    </div>
  );
}
