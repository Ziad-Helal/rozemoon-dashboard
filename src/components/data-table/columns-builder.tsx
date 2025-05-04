import { ColumnDef } from "@tanstack/react-table";
import { Button, Checkbox } from "@/components/ui";
import { Column, ColumnType } from "@/types/table-types";
import { CellBoolean, ColumnHeader } from "./components";
import { formatDate, formatNumber, Language } from "@/localization";
import { useTranslation } from "react-i18next";
import { Currency } from "@/types/api-types";
import { Link } from "react-router";
import { LinkIcon } from "lucide-react";
import { ToolTip } from "@/components";
import { TFunction } from "i18next";
import { ReactNode } from "react";

export function useColumnsBuilder<TData, TActions>(columnsDefination: Column<TActions>[]) {
  const { i18n, t } = useTranslation();

  const columns: ColumnDef<TData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
      enableSorting: false,
      enableHiding: false,
    },
  ];

  columnsDefination.forEach(({ accessorKey, label, type, typeOrStatus, currency, falseIsDestructive, actions: Actions, actionsProps, hidden, enableSorting, enableHiding }) => {
    const base: ColumnDef<TData> = {
      accessorKey,
      id: accessorKey,
      header: ({ column }) => <ColumnHeader column={column} label={label} />,
      enableSorting,
      enableHiding,
      meta: { hidden },
    };

    switch (type) {
      case "actions":
        columns.push({
          ...base,
          cell: ({ row }) => {
            const props: Partial<TActions> = {};
            actionsProps?.forEach((id) => {
              props[id] = row.original[id as string as keyof TData] as any;
            });
            return (
              Actions && (
                <div className="flex gap-1 xl:gap-2 [&_button]:size-7 [&_svg]:!size-4">
                  <Actions {...(props as React.JSX.IntrinsicAttributes & TActions)} />
                </div>
              )
            );
          },
          enableSorting: false,
          enableHiding: false,
        });
        break;
      default:
        columns.push({
          ...base,
          cell: ({ row }) => {
            const value = row.getValue(accessorKey) as Date | string | number | boolean;
            const usedCurrency = type == "price" ? currency || (row.getValue("currency") as Currency) : undefined;
            const finalResult = type ? (
              getCell(type, value, t, i18n.language as Language, falseIsDestructive, usedCurrency)
            ) : typeOrStatus && value ? (
              <span className="capitalize">
                {t(`types&statuses.${typeOrStatus}.${(value as string)[0].toUpperCase() + (value as string).slice(1)}`, { defaultValue: value as string })}
              </span>
            ) : (
              value
            );
            return finalResult ? (
              type == "link" ? (
                finalResult
              ) : (
                <ToolTip content={<>{finalResult}</>} trigger={<p className="block text-ellipsis line-clamp-1">{finalResult as ReactNode}</p>} />
              )
            ) : null;
          },
        });
    }
  });

  return columns;
}

function getCell(type: ColumnType, value: Date | string | number | boolean, t: TFunction, language: Language, falseIsDestructive?: boolean, currency?: Currency) {
  switch (type) {
    case "boolean":
      return value === true || value === false ? <CellBoolean value={value as boolean} falseIsDestructive={falseIsDestructive} /> : null;
    case "date":
      return value ? formatDate(language, value as Date, true) : null;
    case "number":
      return value == 0 || value == undefined ? null : formatNumber(language, value as number, "decimal");
    case "price":
      return value ? formatNumber(language, value as number, "currency", currency) : null;
    case "percentage":
      return value ? formatNumber(language, (value as number) / 100, "percent") : null;
    case "color":
      return (
        <span>
          <span className="inline-block size-3 rounded-full border border-primary me-2" style={{ backgroundColor: value as string }} />
          {value as string}
        </span>
      );
    case "link":
      return (
        <ToolTip
          content={t("keyWords.seeLocation")}
          trigger={
            <Link to={value as string} target="_blank" tabIndex={-1}>
              <Button variant="ghost" size="icon" icon={LinkIcon} iconClassName="!size-4" className="size-7">
                {t("keyWords.seeLocation")}
              </Button>
            </Link>
          }
        />
      );
    case "country":
      return t(`countries.${(value as string).toLowerCase() as "sa"}`);
    default:
      return value;
  }
}
