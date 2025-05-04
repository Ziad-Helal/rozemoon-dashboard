import { Column, Filter } from "@/types/table-types";
import { Table } from "@tanstack/react-table";
import { ColumnSearch, ColumnViewToggler, TableExport, TableFilters } from "../../components";

interface TableHeader_Props<TData, TActions> {
  table: Table<TData>;
  columnsDefinition: Column<TActions>[];
  searchableColumns?: string[];
  filters?: Filter[];
}

export default function TableHeader<TData, TActions>({ table, columnsDefinition, searchableColumns, filters }: TableHeader_Props<TData, TActions>) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-1">
      {searchableColumns && searchableColumns.length > 0 && <ColumnSearch table={table} searchableColumns={searchableColumns} columnsDefinition={columnsDefinition} />}
      {filters && filters.length > 0 && <TableFilters filters={filters} table={table} />}
      <div className="flex-1 flex gap-1 items-center justify-end">
        <TableExport rows={table.getSelectedRowModel().rows} columns={columnsDefinition.slice(0, -1).filter(({ hidden }) => !hidden)} />
        <ColumnViewToggler table={table} columnsDefinition={columnsDefinition} />
      </div>
    </div>
  );
}
