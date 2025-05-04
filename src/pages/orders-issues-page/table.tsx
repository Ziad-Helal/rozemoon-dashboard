import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["userId", "orderId", "bookingId"];

export default function useTable() {
  const { t } = useTranslation();

  const columnsDefinition: Column<Actions_Props>[] = [
    {
      accessorKey: "issueId",
      label: t("dataTable.id"),
      type: "number",
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: "userId",
      label: t("dataTable.userId"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "orderId",
      label: t("dataTable.fastOrderId"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "bookingId",
      label: t("dataTable.scheduledOrderId"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "status",
      label: t("dataTable.status"),
      typeOrStatus: "orderIssueStatus",
    },
    {
      accessorKey: "note",
      label: t("dataTable.notes"),
      enableSorting: false,
    },
    {
      accessorKey: "adminNote",
      label: t("dataTable.adminNote"),
      enableSorting: false,
    },
    {
      accessorKey: "updatedAt",
      label: t("dataTable.updatedAt"),
      type: "date",
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
      enableSorting: false,
    },
    {
      accessorKey: "imageUrl",
      label: "image",
      hidden: true,
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: ["issueId", "status", "imageUrl", "note"] },
  ];

  const filterColumns = {
    status: columnsDefinition.find(({ accessorKey }) => accessorKey == "status")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.status.accessorKey,
      label: filterColumns.status.label,
      options: [
        { value: "Pending", label: t("types&statuses.orderIssueStatus.Pending") },
        { value: "InProgress", label: t("types&statuses.orderIssueStatus.InProgress") },
        { value: "Resolved", label: t("types&statuses.orderIssueStatus.Resolved") },
        { value: "Rejected", label: t("types&statuses.orderIssueStatus.Rejected") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters };
}
