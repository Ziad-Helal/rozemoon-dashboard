import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "branchId", "orderId", "bookingId", "requestedBy", "approvedBy"];

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
      accessorKey: "requestedBy",
      label: t("dataTable.createdBy"),
      type: "number",
    },
    // {
    //   accessorKey: "customerId",
    //   label: t("dataTable.userId"),
    //   type: "number",
    // },
    {
      accessorKey: "orderId",
      label: t("dataTable.fastOrderId"),
      type: "number",
    },
    {
      accessorKey: "bookingId",
      label: t("dataTable.scheduledOrderId"),
      type: "number",
    },
    {
      accessorKey: "orderType",
      label: t("dataTable.orderType"),
    },
    {
      accessorKey: "reason",
      label: t("dataTable.reason"),
      enableSorting: false,
    },
    {
      accessorKey: "managerStatus",
      label: t("dataTable.managerStatus"),
      typeOrStatus: "orderRreturnInvoiceStatus",
      enableSorting: false,
    },
    {
      accessorKey: "managerStatusUpdatedAt",
      label: t("dataTable.updatedAt"),
      type: "date",
    },
    {
      accessorKey: "adminStatus",
      label: t("dataTable.adminStatus"),
      typeOrStatus: "orderRreturnInvoiceStatus",
      enableSorting: false,
    },
    {
      accessorKey: "adminStatusUpdatedAt",
      label: t("dataTable.updatedAt"),
      type: "date",
    },
    {
      accessorKey: "approvedBy",
      label: t("dataTable.approvedBy"),
      type: "number",
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
      actionsProps: ["id", "managerStatus", "adminStatus"],
    },
  ];

  const filterColumns = {
    managerStatus: columnsDefinition.find(({ accessorKey }) => accessorKey == "managerStatus")!,
    adminStatus: columnsDefinition.find(({ accessorKey }) => accessorKey == "adminStatus")!,
    orderType: columnsDefinition.find(({ accessorKey }) => accessorKey == "orderType")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.orderType.accessorKey,
      label: filterColumns.orderType.label,
      options: [
        { value: "Order", label: t("types&statuses.returnInvoiceOrderType.Order") },
        { value: "Booking", label: t("types&statuses.returnInvoiceOrderType.Booking") },
      ],
    },
    {
      id: filterColumns.managerStatus.accessorKey,
      label: filterColumns.managerStatus.label,
      options: [
        { value: "Pending", label: t("types&statuses.orderRreturnInvoiceStatus.Pending") },
        { value: "Approved", label: t("types&statuses.orderRreturnInvoiceStatus.Approved") },
        { value: "Denied", label: t("types&statuses.orderRreturnInvoiceStatus.Denied") },
      ],
    },
    {
      id: filterColumns.adminStatus.accessorKey,
      label: filterColumns.adminStatus.label,
      options: [
        { value: "Pending", label: t("types&statuses.orderRreturnInvoiceStatus.Pending") },
        { value: "Approved", label: t("types&statuses.orderRreturnInvoiceStatus.Approved") },
        { value: "Denied", label: t("types&statuses.orderRreturnInvoiceStatus.Denied") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters };
}
