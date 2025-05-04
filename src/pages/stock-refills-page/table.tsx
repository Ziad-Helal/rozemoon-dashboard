import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "branchId", "providerId"];

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
      accessorKey: "status",
      label: t("dataTable.status"),
      typeOrStatus: "stockRefillRequestStatus",
    },
    {
      accessorKey: "refillItems.length",
      label: t("dataTable.products"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "finalPrice",
      label: t("dataTable.cost"),
      type: "price",
    },
    {
      accessorKey: "currency",
      label: t("dataTable.currency"),
      hidden: true,
    },
    {
      accessorKey: "branchId",
      label: t("dataTable.storeId"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "providerId",
      label: t("dataTable.providerId"),
      type: "number",
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
      accessorKey: "refillItems",
      label: "items",
      hidden: true,
    },
    {
      accessorKey: "actions",
      label: t("dataTable.actions"),
      type: "actions",
      actions: Actions,
      actionsProps: ["id", "status", "branchId", "currency", "finalPrice", "providerId", "refillItems", "createdAt", "updatedAt"],
    },
  ];

  const filterColumns = {
    status: columnsDefinition.find(({ accessorKey }) => accessorKey == "status")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.status.accessorKey,
      label: filterColumns.status.label,
      options: [
        { value: "Pending", label: t("types&statuses.stockRefillRequestStatus.Pending") },
        { value: "Approved", label: t("types&statuses.stockRefillRequestStatus.Approved") },
        { value: "Rejected", label: t("types&statuses.stockRefillRequestStatus.Rejected") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters };
}
