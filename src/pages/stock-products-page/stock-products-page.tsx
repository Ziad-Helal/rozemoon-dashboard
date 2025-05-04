import { useDataGetter } from "@/hooks/api";
import useTable from "./table";
import { defaultPagination } from "@/lib/constants";
import { queryKeys, useGetStock } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { AuthenticatedUser, StockProduct } from "@/types/api-types";
import { useTranslation } from "react-i18next";
import { useQuerySubscribe } from "@/hooks/misc";

export default function StockProducts_Page() {
  const { t } = useTranslation();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination: { ...defaultPagination, branchId: user?.branchId },
    query: useGetStock,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.stock")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<StockProduct, Actions_Props>
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
