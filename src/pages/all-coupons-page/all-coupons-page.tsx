import { useDataGetter } from "@/hooks/api";
import { useGetAllCoupons } from "@/queries";
import { defaultPagination } from "@/lib/constants";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Coupon } from "@/types/api-types";
import { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";
import useTable from "./table";

export default function AllCoupons_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetAllCoupons,
  });

  return (
    <TablePage heading={t("tablePages.allCoupons")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<Coupon, Actions_Props>
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
