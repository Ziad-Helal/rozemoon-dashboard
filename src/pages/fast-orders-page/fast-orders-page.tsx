import useTable from "./table";
import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { queryKeys, useGetAllFastOrders, useGetMyFastOrders, useGetStoreFastOrders } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { AuthenticatedUser, FastOrder } from "@/types/api-types";
import { useQuerySubscribe } from "@/hooks/misc";
import { useTranslation } from "react-i18next";

export default function FastOrders_Page() {
  const { t } = useTranslation();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const userRole = user?.roles[0];
  const { columnsDefinition, searchableColumns, filters, defaultSorting } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination: { ...defaultPagination, sortBy: defaultSorting[0].id, sortDirection: defaultSorting[0].desc ? "desc" : "asc" },
    query: userRole == "Admin" ? useGetAllFastOrders : userRole == "Cashier" ? useGetMyFastOrders : useGetStoreFastOrders,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.fastOrders")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<FastOrder, Actions_Props>
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
