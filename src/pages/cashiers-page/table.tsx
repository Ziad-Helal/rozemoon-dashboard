import { Column } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "firstName", "lastName", "email", "branchId", "createdBy"];

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
      accessorKey: "branchId",
      label: t("dataTable.storeId"),
      type: "number",
    },
    {
      accessorKey: "branchName",
      label: t("dataTable.storeName"),
      enableSorting: false,
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

  return { columnsDefinition, searchableColumns };
}
