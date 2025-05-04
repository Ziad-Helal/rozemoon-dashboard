import { formatNumber, Language } from "@/localization";
import { Table } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

interface TableFooter_Props<TData> {
  table: Table<TData>;
}

export default function TableFooter<TData>({ table }: TableFooter_Props<TData>) {
  const { t, i18n } = useTranslation();
  const rowsCount = table.getFilteredRowModel().rows.length;
  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    rowsCount > 0 && (
      <div className="flex-1 text-sm text-muted-foreground">
        {formatNumber(i18n.language as Language, selectedRowsCount, "decimal")} {t("tablePages.selectedRows.1")} {formatNumber(i18n.language as Language, rowsCount, "decimal")}{" "}
        {t("tablePages.selectedRows.2")}.
      </div>
    )
  );
}
