import { useTranslation } from "react-i18next";
import useTable from "./table";
import { useDataGetter } from "@/hooks/api";
import { defaultPagination } from "@/lib/constants";
import { useGetSettings } from "@/queries";
import { TablePage } from "@/components/layouts";
import { PaginatedDataTable } from "@/components/data-table";
import { Setting } from "@/types/api-types";
import { Actions_Props } from "./actions";
import { ToolTip } from "@/components";
import { Button } from "@/components/ui";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { routes } from "@/routes";

export default function Settings_Page() {
  const { t } = useTranslation();
  const { columnsDefinition, searchableColumns } = useTable();
  const { data, isLoading, setPagination, refetch } = useDataGetter({
    defaultPagination,
    query: useGetSettings,
  });

  return (
    <TablePage
      heading={t("tablePages.settings")}
      refetch={refetch}
      isFetching={isLoading}
      quickActions={
        <ToolTip
          content={t("forms.create")}
          trigger={
            <Link to={routes.createSetting}>
              <Button variant="outline" size="icon" icon={PlusIcon}>
                {t("forms.create")}
              </Button>
            </Link>
          }
        />
      }
    >
      <PaginatedDataTable<Setting, Actions_Props>
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
