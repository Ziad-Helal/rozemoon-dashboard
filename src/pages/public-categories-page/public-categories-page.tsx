import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { useGetPublicCategories } from "@/queries";
import { PublicCategory } from "@/types/api-types";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function PublicCategories_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetPublicCategories,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.publicCategories")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<PublicCategory, Actions_Props>
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
