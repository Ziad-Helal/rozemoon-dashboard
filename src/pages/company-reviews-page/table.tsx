import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "name", "createdById"];

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
      accessorKey: "message",
      label: t("dataTable.message"),
      enableSorting: false,
    },
    {
      accessorKey: "isHidden",
      label: t("dataTable.isHidden"),
      type: "boolean",
      falseIsDestructive: false,
      enableSorting: false,
    },
    {
      accessorKey: "createdById",
      label: t("dataTable.createdBy"),
      type: "number",
    },
    {
      accessorKey: "createdBy.firstName",
      label: t("dataTable.creatorFirstName"),
      enableSorting: false,
    },
    {
      accessorKey: "createdBy.lastName",
      label: t("dataTable.creatorLastName"),
      enableSorting: false,
    },
    {
      accessorKey: "createdBy.email",
      label: t("dataTable.creatorEmail"),
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    {
      accessorKey: "email",
      label: t("dataTable.email"),
      hidden: true,
    },
    {
      accessorKey: "phone",
      label: t("dataTable.phone"),
      hidden: true,
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: ["email", "id", "isHidden", "message", "name", "phone"] },
  ];

  const filterColumns = {
    isHidden: columnsDefinition.find(({ accessorKey }) => accessorKey == "isHidden")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.isHidden.accessorKey,
      label: filterColumns.isHidden.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters };
}
