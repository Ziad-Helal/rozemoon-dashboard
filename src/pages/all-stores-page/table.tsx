import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "name", "address"];

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
      accessorKey: "address",
      label: t("dataTable.address"),
      enableSorting: false,
    },
    {
      accessorKey: "phoneNumber",
      label: t("dataTable.phone"),
      enableSorting: false,
    },
    {
      accessorKey: "currency",
      label: t("dataTable.currency"),
      enableSorting: false,
      typeOrStatus: "currencies",
    },
    {
      accessorKey: "isHidden",
      label: t("dataTable.isHidden"),
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
      accessorKey: "createdByUser.firstName",
      label: t("dataTable.creatorFirstName"),
      enableSorting: false,
    },
    {
      accessorKey: "createdByUser.lastName",
      label: t("dataTable.creatorLastName"),
      enableSorting: false,
    },
    {
      accessorKey: "createdByUser.email",
      label: t("dataTable.creatorEmail"),
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: ["id", "isHidden"] },
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
