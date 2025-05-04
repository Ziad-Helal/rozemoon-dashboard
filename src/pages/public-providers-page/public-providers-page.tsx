import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { useGetPublicProviders } from "@/queries/providers-queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { PublicProvider } from "@/types/api-types";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function PublicProviders_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetPublicProviders,
  });

  return (
    <TablePage heading={t("tablePages.publicProviders")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<PublicProvider, Actions_Props>
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
