import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, Input } from "@/components/ui";
import { useDebounce, useEffectAfterMount } from "@/hooks/misc";
import { Column } from "@/types/table-types";
import { Table } from "@tanstack/react-table";
import { ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ColumnSearch_Props<TData, TActions> {
  table: Table<TData>;
  columnsDefinition: Column<TActions>[];
  searchableColumns: string[];
}

export default function ColumnSearch<TData, TActions>({ table, columnsDefinition, searchableColumns }: ColumnSearch_Props<TData, TActions>) {
  const { i18n, t } = useTranslation();
  const [searchColumn, setSearchColumn] = useState(searchableColumns[0]);
  const [options, setOptions] = useState(
    columnsDefinition.filter(({ accessorKey }) => searchableColumns.includes(accessorKey)).map(({ label, accessorKey }) => ({ label, value: accessorKey }))
  );
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffectAfterMount(() => {
    setOptions(columnsDefinition.filter(({ accessorKey }) => searchableColumns.includes(accessorKey)).map(({ label, accessorKey }) => ({ label, value: accessorKey })));
  }, [i18n.language]);

  useEffectAfterMount(() => {
    debouncedSearchQuery != null && table.getColumn(searchColumn)?.setFilterValue(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    setSearchQuery((table.getColumn(searchColumn)?.getFilterValue() as string | undefined) || null);
  }, [searchColumn]);

  return (
    <div className="flex gap-1 items-center w-full sm:max-w-xs">
      <DropdownMenu dir={i18n.dir()}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" rightIcon={ChevronsUpDownIcon} iconClassName="!size-3">
            {options.find(({ value }) => value == searchColumn)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-h-80 overflow-auto capitalize">
          {options.map(({ label, value }) => (
            <DropdownMenuCheckboxItem key={value} checked={value == searchColumn} onCheckedChange={() => setSearchColumn(value)}>
              {label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Input type="search" value={searchQuery || ""} className="h-8" placeholder={t("inputPlaceHolders.search")} onChange={(event) => setSearchQuery(event.target.value)} />
    </div>
  );
}
