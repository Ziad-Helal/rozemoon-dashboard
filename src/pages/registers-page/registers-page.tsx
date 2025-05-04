import { useGetRegisters } from "@/queries";
import { PaginatedDataTable } from "@/components/data-table";
import useTable from "./table";
import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { Actions_Props } from "./actions";
import { Client } from "@/types/api-types";
import { TablePage } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function Registers_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters, defaultFilters, defaultTableFilters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination: { ...defaultPagination, sortBy: "createdAt", sortDirection: "desc", filters: { ...defaultPagination.filters, ...defaultFilters } },
    query: useGetRegisters,
  });

  return (
    <TablePage heading={t("tablePages.registers")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<Client, Actions_Props>
        columnsDefinition={columnsDefinition}
        data={data?.items}
        paginationData={data?.pagination}
        changePagination={setPagination}
        searchableColumns={searchableColumns}
        filters={filters}
        defaultFilters={defaultTableFilters}
        isLoading={isLoading}
      />
    </TablePage>
  );
}
