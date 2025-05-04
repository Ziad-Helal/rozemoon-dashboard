import { useDataGetter } from "@/hooks/api";
import useTable from "./table";
import { TablePage } from "@/components/layouts";
import { defaultPagination } from "@/lib/constants";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { useGetAllProducts } from "@/queries";
import { Product } from "@/types/api-types";
import { useTranslation } from "react-i18next";

export default function AllProducts_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetAllProducts,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.allProducts")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<Product, Actions_Props>
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
