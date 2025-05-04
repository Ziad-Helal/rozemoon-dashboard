import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "name", "phone", "email", "address", "notes"];

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
      accessorKey: "name",
      label: t("dataTable.name"),
    },
    {
      accessorKey: "phone",
      label: t("dataTable.phone"),
      enableSorting: false,
    },
    {
      accessorKey: "email",
      label: t("dataTable.email"),
      enableSorting: false,
    },
    {
      accessorKey: "address",
      label: t("dataTable.address"),
      enableSorting: false,
    },
    {
      accessorKey: "notes",
      label: t("dataTable.notes"),
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: [] },
  ];

  const filters: Filter[] = [];

  return { columnsDefinition, searchableColumns, filters };
}
