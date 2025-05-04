import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui";
import { Column } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon, EyeOffIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ColumnHeader_Props<TData, TValue> {
  column: Column<TData, TValue>;
  label: string;
}

export default function ColumnHeader<TData, TValue>({ column, label }: ColumnHeader_Props<TData, TValue>) {
  const { i18n, t } = useTranslation();
  const sorting = column.getIsSorted();

  return (
    <DropdownMenu dir={i18n.dir()}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          rightIcon={column.getCanSort() ? (sorting === "desc" ? ChevronDownIcon : sorting === "asc" ? ChevronUpIcon : ChevronsUpDownIcon) : undefined}
          iconClassName="!size-4"
          className="h-8 whitespace-nowrap hover:bg-secondary data-[state=open]:bg-accent"
        >
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="capitalize [&_div]:justify-between [&_svg]:text-muted-foreground" align="start">
        {column.getCanSort() && (
          <>
            <DropdownMenuItem className={sorting == "asc" ? "bg-secondary" : ""} onClick={() => (sorting == "asc" ? column.clearSorting() : column.toggleSorting(false))}>
              {t("keyWords.asc")}
              <ChevronUpIcon />
            </DropdownMenuItem>
            <DropdownMenuItem className={sorting == "desc" ? "bg-secondary" : ""} onClick={() => (sorting == "desc" ? column.clearSorting() : column.toggleSorting(true))}>
              {t("keyWords.desc")}
              <ChevronDownIcon />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={() => column.toggleVisibility(false)} disabled={!column.getCanHide()}>
          {t("keyWords.hide")}
          <EyeOffIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
