import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
} from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { Filter as FilterType, FilterOption as FilterOption_Type } from "@/types/table-types";
import { Column, Table } from "@tanstack/react-table";
import { PlusCircleIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

interface TableFilters_Props<TData> {
  filters: FilterType[];
  table: Table<TData>;
}

export default function TableFilters<TData>({ filters, table }: TableFilters_Props<TData>) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {filters.map((filter) => (
        <Filter key={filter.id} filter={filter} column={table.getColumn(filter.id)} />
      ))}
    </div>
  );
}

interface Filters_Props<TData, TValue> {
  filter: FilterType;
  column?: Column<TData, TValue>;
}

function Filter<TData, TValue>({ filter: { id, label, options }, column }: Filters_Props<TData, TValue>) {
  const { i18n, t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState<string | number | boolean | undefined>();

  return (
    <DropdownMenu key={id} dir={i18n.dir()}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" leftIcon={PlusCircleIcon} className="border-dashed gap-1">
          {label}
          {selectedValue != undefined && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="font-normal lg:hidden">
                {formatNumber(i18n.language as Language, 1, "decimal")}
              </Badge>
              <Badge variant="secondary" className="font-normal hidden lg:block">
                {options.find(({ value }) => value == selectedValue)?.label}
              </Badge>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-80 overflow-auto capitalize">
        {options.map((option) => (
          <FilterOption key={option.label} filterOption={option} column={column} setSelectedValue={setSelectedValue} />
        ))}
        {selectedValue != undefined && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                setSelectedValue(undefined);
                column?.setFilterValue(undefined);
              }}
              className="justify-center"
            >
              {t("tablePages.clearFilters")}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface FilterOption_Props<TData, TValue> {
  filterOption: FilterOption_Type;
  column?: Column<TData, TValue>;
  setSelectedValue: Dispatch<SetStateAction<string | number | boolean | undefined>>;
}
function FilterOption<TData, TValue>({ filterOption: { label, value }, column, setSelectedValue }: FilterOption_Props<TData, TValue>) {
  return (
    <DropdownMenuCheckboxItem
      key={label}
      checked={column?.getFilterValue() == value}
      onCheckedChange={() =>
        setSelectedValue((prevValue) => {
          const newValue = prevValue == value ? undefined : value;
          column?.setFilterValue(newValue);
          return newValue;
        })
      }
    >
      {label}
    </DropdownMenuCheckboxItem>
  );
}
