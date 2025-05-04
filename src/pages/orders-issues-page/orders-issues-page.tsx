import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { useGetAllOrdersIssues } from "@/queries";
import { OrderIssue } from "@/types/api-types";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function OrdersIssues_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetAllOrdersIssues,
  });

  return (
    <TablePage heading={t("tablePages.ordersIssues")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<OrderIssue, Actions_Props>
        columnsDefinition={columnsDefinition}
        data={data?.items}
        paginationData={data?.pagination}
        changePagination={setPagination}
        searchableColumns={searchableColumns}
        defaultFilters={[]}
        filters={filters}
        isLoading={isLoading}
      />
    </TablePage>
  );
}
