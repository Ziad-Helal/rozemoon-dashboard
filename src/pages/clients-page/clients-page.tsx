import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { useGetAllClients } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { Client } from "@/types/api-types";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function Clients_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination: { ...defaultPagination, sortBy: "createdAt", sortDirection: "desc" },
    query: useGetAllClients,
  });

  return (
    <TablePage heading={t("tablePages.clients")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<Client, Actions_Props>
        columnsDefinition={columnsDefinition}
        data={data?.items}
        paginationData={data?.pagination}
        changePagination={setPagination}
        searchableColumns={searchableColumns}
        filters={filters}
        defaultFilters={[]}
        isLoading={isLoading}
      />
    </TablePage>
  );
}
