import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";
import { SortingState } from "@tanstack/react-table";

const searchableColumns = ["id", "note", "customerId"];

const defaultSorting: SortingState = [{ id: "createdAt", desc: true }];

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
      accessorKey: "priceBeforeDiscount",
      label: t("dataTable.originalPrice"),
      type: "price",
      enableSorting: false,
    },
    {
      accessorKey: "totalDiscount",
      label: t("dataTable.discount"),
      type: "price",
      enableSorting: false,
    },
    {
      accessorKey: "finalPrice",
      label: t("dataTable.finalPrice"),
      type: "price",
      enableSorting: false,
    },
    {
      accessorKey: "paidAmount",
      label: t("dataTable.paid"),
      type: "price",
      enableSorting: false,
    },
    {
      accessorKey: "remainingAmount",
      label: t("dataTable.remaining"),
      type: "price",
      enableSorting: false,
    },
    {
      accessorKey: "currency",
      label: t("dataTable.currency"),
      hidden: true,
    },
    {
      accessorKey: "bookingItems.length",
      label: t("dataTable.products"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "status",
      label: t("dataTable.status"),
      typeOrStatus: "scheduledOrderStatus",
    },
    {
      accessorKey: "branchId",
      label: t("dataTable.storeId"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "note",
      label: t("dataTable.notes"),
      enableSorting: false,
    },
    {
      accessorKey: "deliveryAddress.fullAddress",
      label: t("dataTable.address"),
      enableSorting: false,
    },
    {
      accessorKey: "deliveryAddress.gLocation",
      label: t("dataTable.location"),
      type: "link",
      enableSorting: false,
    },
    {
      accessorKey: "deliveryAt",
      label: t("dataTable.deliveryAt"),
      type: "date",
    },
    {
      accessorKey: "isSpecial",
      label: t("dataTable.isBigOrder"),
      type: "boolean",
      enableSorting: false,
    },
    {
      accessorKey: "isFullPaid",
      label: t("dataTable.isFullyPaid"),
      type: "boolean",
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
    },
    {
      accessorKey: "customerId",
      label: t("dataTable.clientId"),
      type: "number",
    },
    {
      accessorKey: "customerDto.firstName",
      label: t("dataTable.firstName"),
      enableSorting: false,
    },
    {
      accessorKey: "customerDto.lastName",
      label: t("dataTable.lastName"),
      enableSorting: false,
    },
    {
      accessorKey: "customerDto.email",
      label: t("dataTable.email"),
      enableSorting: false,
    },
    {
      accessorKey: "customerDto.docsVerified",
      label: t("dataTable.verifiedMerchant"),
      type: "boolean",
      falseIsDestructive: true,
      enableSorting: false,
    },
    {
      accessorKey: "deliveryAddress",
      label: "full address",
      hidden: true,
    },
    {
      accessorKey: "customerDto",
      label: "client",
      hidden: true,
    },
    {
      accessorKey: "staffId",
      label: "cashier id",
      hidden: true,
    },
    {
      accessorKey: "staffDto",
      label: "cashier",
      hidden: true,
    },
    {
      accessorKey: "bookingItems",
      label: "items",
      hidden: true,
    },
    {
      accessorKey: "actions",
      label: t("dataTable.actions"),
      type: "actions",
      actions: Actions,
      actionsProps: [
        "id",
        "priceBeforeDiscount",
        "totalDiscount",
        "finalPrice",
        "paidAmount",
        "remainingAmount",
        "currency",
        "status",
        "branchId",
        "note",
        "deliveryAddress",
        "deliveryAt",
        "isSpecial",
        "isFullPaid",
        "updatedAt",
        "createdAt",
        "customerId",
        "customerDto",
        "staffId",
        "staffDto",
        "bookingItems",
      ],
    },
  ];

  const filterColumns = {
    status: columnsDefinition.find(({ accessorKey }) => accessorKey == "status")!,
    isFullPaid: columnsDefinition.find(({ accessorKey }) => accessorKey == "isFullPaid")!,
    isSpecial: columnsDefinition.find(({ accessorKey }) => accessorKey == "isSpecial")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.status.accessorKey,
      label: filterColumns.status.label,
      options: [
        { value: "Pending", label: t("types&statuses.scheduledOrderStatus.Pending") },
        { value: "FullyPrepared", label: t("types&statuses.scheduledOrderStatus.FullyPrepared") },
        { value: "Delivered", label: t("types&statuses.scheduledOrderStatus.Delivered") },
        { value: "DeliveredConfirmed", label: t("types&statuses.scheduledOrderStatus.DeliveredConfirmed") },
        { value: "RequestedToSpecialCancel", label: t("types&statuses.scheduledOrderStatus.RequestedToSpecialCancel") },
        { value: "Canceled", label: t("types&statuses.scheduledOrderStatus.Canceled") },
        { value: "AssignedToBranch", label: t("types&statuses.scheduledOrderStatus.AssignedToBranch") },
        { value: "Rejected", label: t("types&statuses.scheduledOrderStatus.Rejected") },
        { value: "HasIssue", label: t("types&statuses.scheduledOrderStatus.HasIssue") },
      ],
    },
    {
      id: filterColumns.isFullPaid.accessorKey,
      label: filterColumns.isFullPaid.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
    {
      id: filterColumns.isSpecial.accessorKey,
      label: filterColumns.isSpecial.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters, defaultSorting };
}
