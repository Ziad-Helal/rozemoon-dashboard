import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "name", "description", "categoryId", "colorId"];

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
      accessorKey: "productType",
      label: t("dataTable.type"),
      typeOrStatus: "productTypes",
    },
    {
      accessorKey: "description",
      label: t("dataTable.description"),
      enableSorting: false,
    },
    {
      accessorKey: "price_SAR",
      label: t("dataTable.SARPrice"),
      type: "price",
      currency: "SAR",
    },
    {
      accessorKey: "price_USD",
      label: t("dataTable.USDPrice"),
      type: "price",
      currency: "USD",
    },
    {
      accessorKey: "discountId",
      label: t("dataTable.discountId"),
      type: "number",
    },
    {
      accessorKey: "discountPercentage",
      label: t("dataTable.discountPercentage"),
      type: "percentage",
      enableSorting: false,
    },
    {
      accessorKey: "categoryId",
      label: t("dataTable.categoryId"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "colorId",
      label: t("dataTable.colorId"),
      type: "number",
      enableSorting: false,
    },
    {
      accessorKey: "rating",
      label: t("dataTable.rating"),
      type: "number",
    },
    {
      accessorKey: "countRating",
      label: t("dataTable.ratingsCount"),
      type: "number",
    },
    {
      accessorKey: "isFeatured",
      label: t("dataTable.isFeatured"),
      type: "boolean",
      enableSorting: false,
    },
    {
      accessorKey: "isHidden",
      label: t("dataTable.isHidden"),
      type: "boolean",
      falseIsDestructive: false,
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
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    {
      accessorKey: "actions",
      label: t("dataTable.actions"),
      type: "actions",
      actions: Actions,
      actionsProps: ["id", "discountId", "discountPercentage", "isHidden"],
    },
  ];

  const filterColumns = {
    type: columnsDefinition.find(({ accessorKey }) => accessorKey == "productType")!,
    isFeatured: columnsDefinition.find(({ accessorKey }) => accessorKey == "isFeatured")!,
    isHidden: columnsDefinition.find(({ accessorKey }) => accessorKey == "isHidden")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.type.accessorKey,
      label: filterColumns.type.label,
      options: [
        { value: "Stem", label: t("types&statuses.productTypes.Stem") },
        { value: "Bunch", label: t("types&statuses.productTypes.Bunch") },
      ],
    },
    {
      id: filterColumns.isFeatured.accessorKey,
      label: filterColumns.isFeatured.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
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
