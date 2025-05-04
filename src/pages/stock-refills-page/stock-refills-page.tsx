import { useDataGetter } from "@/hooks/api";
import useTable from "./table";
import { defaultPagination } from "@/lib/constants";
import { useGetStockRefills } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { StockRefill } from "@/types/api-types";
import { useTranslation } from "react-i18next";

export default function StockRefills_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetStockRefills,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.stockRefillRequests")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<StockRefill, Actions_Props>
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
