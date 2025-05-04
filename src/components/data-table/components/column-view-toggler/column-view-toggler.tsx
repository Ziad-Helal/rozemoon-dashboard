import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui";
import { Column } from "@/types/table-types";
import { Table } from "@tanstack/react-table";
import { Settings2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ColumnViewToggler_Props<TData, TActions> {
  table: Table<TData>;
  columnsDefinition: Column<TActions>[];
}

export default function ColumnViewToggler<TData, TActions>({ table, columnsDefinition }: ColumnViewToggler_Props<TData, TActions>) {
  const { i18n, t } = useTranslation();

  return (
    <DropdownMenu dir={i18n.dir()}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" leftIcon={Settings2Icon}>
          {t("keyWords.view")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-80 overflow-auto capitalize">
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide() && !(column.columnDef.meta as { hidden?: boolean })?.hidden)
          .map((column) => (
            <DropdownMenuCheckboxItem key={column.id} checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
              {columnsDefinition.find(({ accessorKey }) => accessorKey == column.id)?.label}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
