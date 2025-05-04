import { useDataGetter } from "@/hooks/api";
import useTable from "./table";
import { defaultPagination } from "@/lib/constants";
import { useGetReturnRequests } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { ReturnRequest } from "@/types/api-types";
import { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

export default function ReturnRequests_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetReturnRequests,
  });

  return (
    <TablePage heading={t("tablePages.returnRequests")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<ReturnRequest, Actions_Props>
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
