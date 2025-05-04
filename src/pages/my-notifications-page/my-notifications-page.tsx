import { useDataGetter } from "@/hooks/api";
import { useGetMyNotifications } from "@/queries";
import { defaultPagination } from "@/lib/constants";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Notification } from "@/types/api-types";
import { Actions_Props } from "./actions";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function MyNotifications_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetMyNotifications,
  });

  return (
    <TablePage heading={t("tablePages.myNotifications")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<Notification, Actions_Props>
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
