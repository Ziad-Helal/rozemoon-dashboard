import { useDataGetter } from "@/hooks/api";
import useTable from "./table";
import { defaultPagination } from "@/lib/constants";
import { useGetAllStores } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { Store } from "@/types/api-types";
import { useTranslation } from "react-i18next";

export default function AllStores_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetAllStores,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.allStores")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<Store, Actions_Props>
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
