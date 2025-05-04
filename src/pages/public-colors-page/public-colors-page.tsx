import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { Actions_Props } from "./actions";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { useGetPublicColors } from "@/queries";
import { PublicColor } from "@/types/api-types";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function PublicColors_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetPublicColors,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.publicColors")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<PublicColor, Actions_Props>
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
