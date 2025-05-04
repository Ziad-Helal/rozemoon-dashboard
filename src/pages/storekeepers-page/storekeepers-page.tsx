import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { queryKeys, useGetAllStorekeepers, useGetStoreStorekeepers } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Actions_Props } from "./actions";
import { AuthenticatedUser, Storekeeper } from "@/types/api-types";
import { useQuerySubscribe } from "@/hooks/misc";
import useTable from "./table";
import { useTranslation } from "react-i18next";

export default function Storekeepers_Page() {
  const { t } = useTranslation();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { columnsDefinition, searchableColumns } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: user?.roles[0] == "Admin" ? useGetAllStorekeepers : useGetStoreStorekeepers,
    refetchOnLanguageChange: true,
  });

  return (
    <TablePage heading={t("tablePages.storekeepers")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<Storekeeper, Actions_Props>
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
