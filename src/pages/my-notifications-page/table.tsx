import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "receiverId", "title", "content"];

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
      accessorKey: "receiverId",
      label: t("dataTable.receiverId"),
      type: "number",
    },
    {
      accessorKey: "type",
      label: t("dataTable.type"),
      typeOrStatus: "notificationTypes",
    },
    {
      accessorKey: "title",
      label: t("dataTable.title"),
    },
    {
      accessorKey: "content",
      label: t("dataTable.content"),
      enableSorting: false,
    },
    {
      accessorKey: "isRead",
      label: t("dataTable.isRead"),
      type: "boolean",
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: ["id", "title"] },
  ];

  const filterColumns = {
    type: columnsDefinition.find(({ accessorKey }) => accessorKey == "type")!,
    isRead: columnsDefinition.find(({ accessorKey }) => accessorKey == "isRead")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.type.accessorKey,
      label: filterColumns.type.label,
      options: [
        { value: "Info", label: t("types&statuses.notificationTypes.Info") },
        { value: "Wallet", label: t("types&statuses.notificationTypes.Wallet") },
        { value: "Order", label: t("types&statuses.notificationTypes.Order") },
        { value: "Booking", label: t("types&statuses.notificationTypes.Booking") },
        { value: "Subscription", label: t("types&statuses.notificationTypes.Subscription") },
      ],
    },
    {
      id: filterColumns.isRead.accessorKey,
      label: filterColumns.isRead.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters };
}
