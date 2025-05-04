import { Button } from "@/components/ui";
import { formatDate, formatNumber, Language } from "@/localization";
import { Currency } from "@/types/api-types";
import { Column, ColumnType } from "@/types/table-types";
import { Row } from "@tanstack/react-table";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";

interface TableExport_Props<TData, TActions> {
  rows: Row<TData>[];
  columns: Column<TActions>[];
}

export default function TableExport<TData, TActions>({ rows, columns }: TableExport_Props<TData, TActions>) {
  const { i18n, t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  function JsonFormatter() {
    const json: Record<string, any>[] = [];
    rows.forEach(({ getValue }) => {
      const row: Record<string, any> = {};
      columns.forEach(({ accessorKey, label, type, currency, typeOrStatus }) => {
        const rowValue = getValue(accessorKey);
        const usedCurrency = type == "price" ? currency || (getValue("currency") as Currency) : undefined;
        row[label] = type
          ? formatValue(type, rowValue as Date | string | number | boolean, i18n.language as Language, usedCurrency)
          : typeOrStatus && rowValue
          ? t(`types&statuses.${typeOrStatus}.${(rowValue as string)[0].toUpperCase() + (rowValue as string).slice(1)}`, { defaultValue: rowValue as string })
          : rowValue;
      });
      json.push(row);
    });
    return json;
  }

  function workBookBuilder(json: Record<string, any>[]) {
    const workSheet = XLSX.utils.json_to_sheet(json);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet);
    return workBook;
  }

  function downloadFile() {
    setIsLoading(true);
    const json = JsonFormatter();
    const workBook = workBookBuilder(json);
    XLSX.writeFile(workBook, location.href.split("/").pop() + ".xlsx");
    setIsLoading(false);
  }

  function formatValue(type: ColumnType, value: Date | string | number | boolean, language: Language, currency?: Currency) {
    switch (type) {
      case "boolean":
        return value === true || value === false ? (value ? t("keyWords.yes") : t("keyWords.no")) : null;
      case "date":
        return value ? formatDate(language, value as Date, true) : null;
      case "number":
        return value == 0 || value == undefined ? null : formatNumber(language, value as number, "decimal");
      case "price":
        return value ? formatNumber(language, value as number, "currency", currency, undefined, undefined, true) : null;
      case "percentage":
        return value ? formatNumber(language, (value as number) / 100, "percent") : null;
      case "country":
        return t(`countries.${(value as string).toLowerCase() as "sa"}`);
      default:
        return value;
    }
  }

  return (
    <Button size="sm" variant="secondary" leftIcon={DownloadIcon} onClick={downloadFile} isLoading={isLoading} disabled={rows.length == 0}>
      {t("keyWords.export")}
    </Button>
  );
}
