import { useTranslation } from "react-i18next";
import useTable from "./table";
import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { useGetOrdersReviews } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { OrderReview } from "@/types/api-types";
import { Actions_Props } from "./actions";

export default function OrdersReviews_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetOrdersReviews,
  });

  return (
    <TablePage heading={t("tablePages.ordersReviews")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<OrderReview, Actions_Props>
        columnsDefinition={columnsDefinition}
        data={data?.items}
        paginationData={data?.pagination}
        changePagination={setPagination}
        searchableColumns={searchableColumns}
        defaultFilters={[]}
        isLoading={isLoading}
      />
    </TablePage>
  );
}
