import { convertPaginationToTableFilters } from "@/lib/api";
import { PaginationFilters } from "@/types/api-types";
import { Column, Filter } from "@/types/table-types";
import { ColumnFiltersState } from "@tanstack/react-table";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const defaultFilters: PaginationFilters = { docVerifiedStatus: "under_review" };
const defaultTableFilters: ColumnFiltersState = convertPaginationToTableFilters(defaultFilters);

const searchableColumns = ["id", "firstName", "lastName", "email", "phoneNumber"];

export default function useTable() {
  const { t } = useTranslation();

  const columnsDefinition: Column<Actions_Props>[] = [
    {
      accessorKey: "id",
      label: t("dataTable.id"),
      type: "number",
      enableHiding: false,
    },
    {
      accessorKey: "firstName",
      label: t("dataTable.firstName"),
    },
    {
      accessorKey: "lastName",
      label: t("dataTable.lastName"),
    },
    {
      accessorKey: "email",
      label: t("dataTable.email"),
      enableSorting: false,
    },
    {
      accessorKey: "phoneNumber",
      label: t("dataTable.phone"),
      enableSorting: false,
    },
    {
      accessorKey: "countryCode",
      label: t("dataTable.country"),
      type: "country",
      enableSorting: false,
    },
    {
      accessorKey: "isConfirmedEmail",
      label: t("dataTable.verifiedEmail"),
      type: "boolean",
      falseIsDestructive: true,
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: ["id", "status"] },
  ];

  const filterColumns = {
    isConfirmedEmail: columnsDefinition.find(({ accessorKey }) => accessorKey == "isConfirmedEmail")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.isConfirmedEmail.accessorKey,
      label: filterColumns.isConfirmedEmail.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters, defaultFilters, defaultTableFilters };
}
