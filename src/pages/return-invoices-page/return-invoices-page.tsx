import useTable from "./table";
import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { useGetReturnInvoices } from "@/queries";
import { TablePage } from "@/components/layouts";
import { useTranslation } from "react-i18next";
import { PaginatedDataTable } from "@/components/data-table";
import type { ReturnInvoice } from "@/types/api-types";
import type { Actions_Props } from "./actions";

export default function ReturnInvoices_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns, filters } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetReturnInvoices,
  });

  return (
    <TablePage heading={t("tablePages.returnInvoices")} refetch={refetch} isFetching={isLoading}>
      <PaginatedDataTable<ReturnInvoice, Actions_Props>
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
