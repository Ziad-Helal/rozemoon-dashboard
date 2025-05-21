import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";
import { Column, Filter } from "@/types/table-types";
import { SortingState } from "@tanstack/react-table";

const searchableColumns = ["id", "note", "customerId", "staffId"];

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
      accessorKey: "branchId",
      label: t("dataTable.storeId"),
      type: "number",
    },
    {
      accessorKey: "totalPriceBeforeDiscount",
      label: t("dataTable.originalPrice"),
      type: "price",
    },
    {
      accessorKey: "totalDiscountAmount",
      label: t("dataTable.discount"),
      type: "price",
    },
    {
      accessorKey: "extraDiscountAmount",
      label: t("dataTable.extraDiscount"),
      type: "price",
    },
    {
      accessorKey: "taxAmount",
      label: t("dataTable.tax"),
      type: "price",
    },
    {
      accessorKey: "finalPrice",
      label: t("dataTable.finalPrice"),
      type: "price",
      enableSorting: false,
    },
    {
      accessorKey: "currency",
      label: t("dataTable.currency"),
      hidden: true,
    },
    {
      accessorKey: "orderItems.length",
      label: t("dataTable.products"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "status",
      label: t("dataTable.status"),
      typeOrStatus: "fastOrderStatus",
    },
    {
      accessorKey: "note",
      label: t("dataTable.notes"),
      enableSorting: false,
    },
    {
      accessorKey: "isDelivered",
      label: t("dataTable.isDelivered"),
      type: "boolean",
      falseIsDestructive: true,
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
      accessorKey: "paymentMethod",
      label: t("dataTable.paymentMethod"),
      typeOrStatus: "paymentMethods",
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
      accessorKey: "staffId",
      label: t("dataTable.cashierId"),
      type: "number",
    },
    {
      accessorKey: "staffDto.firstName",
      label: t("dataTable.cashierFirstName"),
      enableSorting: false,
    },
    {
      accessorKey: "staffDto.lastName",
      label: t("dataTable.cashierLastName"),
      enableSorting: false,
    },
    {
      accessorKey: "staffDto.email",
      label: t("dataTable.cashierEmail"),
      enableSorting: false,
    },
    {
      accessorKey: "orderItems",
      label: "items",
      hidden: true,
    },
    {
      accessorKey: "customerDto",
      label: "items",
      hidden: true,
    },
    {
      accessorKey: "orderItems",
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
        "branchId",
        "createdAt",
        "currency",
        "customerDto",
        "customerId",
        "deliveryAddress",
        "deliveryAt",
        "extraDiscountAmount",
        "finalPrice",
        "isDelivered",
        "note",
        "orderItems",
        "paymentMethod",
        "staffDto",
        "staffId",
        "status",
        "taxAmount",
        "totalDiscountAmount",
        "totalPriceBeforeDiscount",
      ],
    },
  ];

  const filterColumns = {
    status: columnsDefinition.find(({ accessorKey }) => accessorKey == "status")!,
    paymentMethod: columnsDefinition.find(({ accessorKey }) => accessorKey == "paymentMethod")!,
    isDelivered: columnsDefinition.find(({ accessorKey }) => accessorKey == "isDelivered")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.status.accessorKey,
      label: filterColumns.status.label,
      options: [
        { value: "Pending", label: t("types&statuses.fastOrderStatus.Pending") },
        { value: "Delivering", label: t("types&statuses.fastOrderStatus.Delivering") },
        { value: "Delivered", label: t("types&statuses.fastOrderStatus.Delivered") },
        { value: "DeliveredConfirmed", label: t("types&statuses.fastOrderStatus.DeliveredConfirmed") },
        { value: "Cancelled", label: t("types&statuses.fastOrderStatus.Cancelled") },
        { value: "Returned", label: t("types&statuses.fastOrderStatus.Returned") },
        { value: "PartiallyReturned", label: t("types&statuses.fastOrderStatus.PartiallyReturned") },
        { value: "NotPaied", label: t("types&statuses.fastOrderStatus.NotPaied") },
        { value: "Charged", label: t("types&statuses.fastOrderStatus.Charged") },
        { value: "HasIssue", label: t("types&statuses.fastOrderStatus.HasIssue") },
        { value: "IssueReported", label: t("types&statuses.fastOrderStatus.IssueReported") },
      ],
    },
    {
      id: filterColumns.paymentMethod.accessorKey,
      label: filterColumns.paymentMethod.label,
      options: [
        { value: "Cash", label: t("types&statuses.paymentMethods.Cash") },
        { value: "Wallet", label: t("types&statuses.paymentMethods.Wallet") },
        { value: "CreditCard", label: t("types&statuses.paymentMethods.CreditCard") },
        { value: "WalletAndCreditCard", label: t("types&statuses.paymentMethods.WalletAndCreditCard") },
        { value: "Cheque", label: t("types&statuses.paymentMethods.Cheque") },
        { value: "BankTransfer", label: t("types&statuses.paymentMethods.BankTransfer") },
        { value: "COD", label: t("types&statuses.paymentMethods.COD") },
        { value: "Other", label: t("types&statuses.paymentMethods.Other") },
      ],
    },
    {
      id: filterColumns.isDelivered.accessorKey,
      label: filterColumns.isDelivered.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters, defaultSorting };
}
