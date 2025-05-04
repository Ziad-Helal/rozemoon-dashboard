import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["firstName", "lastName", "email", "createdBy"];

export default function useTable() {
  const { t } = useTranslation();

  const columnsDefinition: Column<Actions_Props>[] = [
    {
      accessorKey: "id",
      label: t("dataTable.id"),
      type: "number",
      enableHiding: false,
      enableSorting: false,
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
    },
    {
      accessorKey: "isDeleted",
      label: t("dataTable.isDeleted"),
      type: "boolean",
      falseIsDestructive: false,
      enableSorting: false,
    },
    {
      accessorKey: "createdBy",
      label: t("dataTable.createdBy"),
      type: "number",
    },
    {
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: [] },
  ];

  const filterColumns = {
    isDeleted: columnsDefinition.find(({ accessorKey }) => accessorKey == "isDeleted")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.isDeleted.accessorKey,
      label: filterColumns.isDeleted.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters };
}
