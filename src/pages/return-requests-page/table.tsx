import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "branchId", "userId", "orderId", "productId"];

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
      accessorKey: "branchId",
      label: t("dataTable.storeId"),
      type: "number",
    },
    {
      accessorKey: "userId",
      label: t("dataTable.userId"),
      type: "number",
    },
    {
      accessorKey: "orderId",
      label: t("dataTable.fastOrderId"),
      type: "number",
    },
    {
      accessorKey: "productId",
      label: t("dataTable.productId"),
      type: "number",
    },
    {
      accessorKey: "quantity",
      label: t("dataTable.quantity"),
      type: "number",
    },
    {
      accessorKey: "reason",
      label: t("dataTable.reason"),
      enableSorting: false,
    },
    {
      accessorKey: "status",
      label: t("dataTable.managerStatus"),
      typeOrStatus: "orderRreturnRequestStatus",
      enableSorting: false,
    },
    {
      accessorKey: "statusFromAdmin",
      label: t("dataTable.adminStatus"),
      typeOrStatus: "orderRreturnRequestStatus",
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    {
      accessorKey: "actions",
      label: t("dataTable.actions"),
      type: "actions",
      actions: Actions,
      actionsProps: ["id", "status", "statusFromAdmin"],
    },
  ];

  const filterColumns = {
    status: columnsDefinition.find(({ accessorKey }) => accessorKey == "status")!,
    statusFromAdmin: columnsDefinition.find(({ accessorKey }) => accessorKey == "statusFromAdmin")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.status.accessorKey,
      label: filterColumns.status.label,
      options: [
        { value: "Pending", label: t("types&statuses.orderRreturnRequestStatus.Pending") },
        { value: "Approved", label: t("types&statuses.orderRreturnRequestStatus.Approved") },
        { value: "Rejected", label: t("types&statuses.orderRreturnRequestStatus.Rejected") },
      ],
    },
    {
      id: filterColumns.statusFromAdmin.accessorKey,
      label: filterColumns.statusFromAdmin.label,
      options: [
        { value: "Pending", label: t("types&statuses.orderRreturnRequestStatus.Pending") },
        { value: "Approved", label: t("types&statuses.orderRreturnRequestStatus.Approved") },
        { value: "Rejected", label: t("types&statuses.orderRreturnRequestStatus.Rejected") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters };
}
