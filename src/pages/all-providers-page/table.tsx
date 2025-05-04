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
      accessorKey: "isActive",
      label: t("dataTable.isActive"),
      type: "boolean",
      falseIsDestructive: true,
      enableSorting: false,
      hidden: true,
    },
    {
      accessorKey: "isHidden",
      label: t("dataTable.isHidden"),
      type: "boolean",
      falseIsDestructive: false,
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      label: t("dataTable.isHidden"),
      type: "date",
    },
    {
      accessorKey: "contact",
      label: "contact",
      hidden: true,
    },
    {
      accessorKey: "actions",
      label: t("dataTable.actions"),
      type: "actions",
      actions: Actions,
      actionsProps: ["address", "contact", "email", "id", "isHidden", "isActive", "name", "notes", "phone"],
    },
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
