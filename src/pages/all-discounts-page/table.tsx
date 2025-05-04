import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "name", "percentage"];

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
      enableSorting: false,
    },
    {
      accessorKey: "percentage",
      label: t("dataTable.percentage"),
      type: "percentage",
    },
    {
      accessorKey: "isActive",
      label: t("dataTable.isActive"),
      type: "boolean",
      falseIsDestructive: true,
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: ["id", "isActive"] },
  ];

  const filterColumns = {
    isActive: columnsDefinition.find(({ accessorKey }) => accessorKey == "isActive")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.isActive.accessorKey,
      label: filterColumns.isActive.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters };
}
