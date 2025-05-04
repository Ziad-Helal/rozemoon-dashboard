import { Column } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "rating", "customerId"];

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
      accessorKey: "product.categoryId",
      label: t("dataTable.categoryId"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "product.id",
      label: t("dataTable.productId"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "product.name",
      label: t("dataTable.productName"),
      enableSorting: false,
    },
    {
      accessorKey: "product.description",
      label: t("dataTable.productDescription"),
      enableSorting: false,
    },
    {
      accessorKey: "product.productType",
      label: t("dataTable.productType"),
    },
    {
      accessorKey: "rating",
      label: t("dataTable.rating"),
      type: "number",
    },
    {
      accessorKey: "review",
      label: t("dataTable.review"),
      enableSorting: false,
    },
    {
      accessorKey: "customerId",
      label: t("dataTable.clientId"),
      type: "number",
    },
    {
      accessorKey: "customer.firstName",
      label: t("dataTable.firstName"),
      enableSorting: false,
    },
    {
      accessorKey: "customer.lastName",
      label: t("dataTable.lastName"),
      enableSorting: false,
    },
    {
      accessorKey: "customer.email",
      label: t("dataTable.email"),
      enableSorting: false,
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
