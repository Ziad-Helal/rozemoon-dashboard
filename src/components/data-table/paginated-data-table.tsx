import DataTable, { DataTableProps } from "./data-table";
import { Paginator } from "@/components";
import { Pagination_Props } from "@/components/misc/paginator";
import { useEffectAfterMount } from "@/hooks/misc";
import { PaginationFilters } from "@/types/api-types";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

type PaginatedDataTable_Props<TData, TActions> = Omit<Pagination_Props, "children" | "isEmpty"> & { defaultFilters?: ColumnFiltersState; defaultSorting?: SortingState } & Omit<
    DataTableProps<TData, TActions>,
    "sortingState" | "filtersState" | "setSortingState" | "setFiltersState"
  >;

export default function PaginatedDataTable<TData, TActions>({
  paginationData,
  changePagination,
  className,
  listClassName,
  isLoading,
  defaultFilters,
  defaultSorting,
  data,
  ...tableProps
}: PaginatedDataTable_Props<TData, TActions>) {
  const [sortingState, setSortingState] = useState<SortingState>(defaultSorting || []);
  const [filtersState, setFiltersState] = useState<ColumnFiltersState>(defaultFilters || []);

  useEffectAfterMount(() => {
    const sorting = sortingState[0];
    if (sorting) changePagination({ ...paginationData, sortBy: sorting.id, sortDirection: sorting.desc ? "desc" : "asc" });
    else changePagination({ ...paginationData, sortBy: undefined, sortDirection: undefined });
  }, [sortingState]);

  useEffectAfterMount(() => {
    if (filtersState.length) {
      const filters: PaginationFilters = {};
      const currentFilters = defaultFilters && defaultFilters.length < filtersState.length ? filtersState : defaultFilters || [];
      currentFilters.forEach(({ id, value }) => {
        filters[id as keyof PaginationFilters] = typeof value == "boolean" ? `${value}` : (value as any);
      });
      changePagination({ ...paginationData, filters });
    } else changePagination({ ...paginationData, filters: {} });
  }, [filtersState]);

  return (
    <Paginator
      paginationData={paginationData}
      changePagination={changePagination}
      className={className}
      listClassName={listClassName}
      isLoading={isLoading}
      isEmpty={!data?.length}
    >
      <DataTable
        isLoading={isLoading}
        sortingState={sortingState}
        filtersState={filtersState}
        setSortingState={setSortingState}
        setFiltersState={setFiltersState}
        data={data}
        {...tableProps}
      />
    </Paginator>
  );
}
