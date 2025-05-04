import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { Actions_Props } from "./actions";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { useGetAllColors } from "@/queries";
import { Color } from "@/types/api-types";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function AllColors_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetAllColors,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.allColors")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<Color, Actions_Props>
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
