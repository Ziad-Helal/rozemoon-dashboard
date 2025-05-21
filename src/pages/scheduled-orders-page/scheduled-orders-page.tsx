import { useDataGetter } from "@/hooks/api";
import useTable from "./table";
import { defaultPagination } from "@/lib/constants";
import { queryKeys, useGetAllScheduledOrders, useGetStoreScheduledOrders } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { AuthenticatedUser, ScheduledOrder } from "@/types/api-types";
import { useQuerySubscribe } from "@/hooks/misc";
import { useTranslation } from "react-i18next";

export default function ScheduledOrders_Page() {
  const { t } = useTranslation();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { columnsDefinition, searchableColumns, filters, defaultSorting } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination: { ...defaultPagination, sortBy: defaultSorting[0].id, sortDirection: defaultSorting[0].desc ? "desc" : "asc" },
    query: user?.roles[0] == "Admin" ? useGetAllScheduledOrders : useGetStoreScheduledOrders,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.scheduledOrders")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<ScheduledOrder, Actions_Props>
        columnsDefinition={columnsDefinition}
        data={data?.items}
        paginationData={data?.pagination}
        changePagination={setPagination}
        searchableColumns={searchableColumns}
        filters={filters}
        defaultSorting={defaultSorting}
        isLoading={isLoading}
      />
    </TablePage>
  );
}
