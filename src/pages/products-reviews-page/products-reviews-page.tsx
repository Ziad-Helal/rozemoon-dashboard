import { useDataGetter } from "@/hooks/api";
import { useGetProductsReviews } from "@/queries";
import { defaultPagination } from "@/lib/constants";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { ProductReview } from "@/types/api-types";
import { Actions_Props } from "./actions";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function ProductsReviews_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetProductsReviews,
  });

  return (
    <TablePage heading={t("tablePages.productsReviews")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<ProductReview, Actions_Props>
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
