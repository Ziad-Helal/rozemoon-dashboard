import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { useGetAllCategories } from "@/queries";
import { Category } from "@/types/api-types";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function AllCategories_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetAllCategories,
  });

  return (
    <TablePage heading={t("tablePages.allCategories")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<Category, Actions_Props>
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
