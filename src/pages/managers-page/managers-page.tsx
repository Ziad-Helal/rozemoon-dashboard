import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { useGetAllManagers } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { Manager } from "@/types/api-types";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function Managers_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetAllManagers,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.managers")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<Manager, Actions_Props>
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
