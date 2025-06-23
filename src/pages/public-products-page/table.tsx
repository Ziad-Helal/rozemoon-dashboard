import { Column, Filter } from "@/types/table-types";
import Actions, { type Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys } from "@/queries";
import type { AuthenticatedUser } from "@/types/api-types";

const searchableColumns = ["id", "name", "description", "categoryId", "colorId"];

export default function useTable() {
  const { t } = useTranslation();
  const { roles, currency } = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth])!;
  const userRole = roles[0];

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
      accessorKey: `merchPrice${currency}`,
      label: t("dataTable.merchPrice"),
      type: "price",
      currency,
      hidden: userRole == "Admin",
    },
    {
      accessorKey: `indiPrice${currency}`,
      label: t("dataTable.indiPrice"),
      type: "price",
      currency,
      hidden: userRole == "Admin",
    },
    {
      accessorKey: "price",
      label: t("dataTable.appPrice"),
      type: "price",
      currency,
      hidden: userRole == "Admin",
    },
    {
      accessorKey: "indiPriceSAR",
      label: t("dataTable.indiPriceSAR"),
      type: "price",
      currency: "SAR",
      hidden: userRole != "Admin",
    },
    {
      accessorKey: "indiPriceUSD",
      label: t("dataTable.indiPriceUSD"),
      type: "price",
      currency: "USD",
      hidden: userRole != "Admin",
    },
    {
      accessorKey: "merchPriceSAR",
      label: t("dataTable.merchPriceSAR"),
      type: "price",
      currency: "SAR",
      hidden: userRole != "Admin",
    },
    {
      accessorKey: "merchPriceUSD",
      label: t("dataTable.merchPriceUSD"),
      type: "price",
      currency: "USD",
      hidden: userRole != "Admin",
    },
    {
      accessorKey: "price",
      label: t("dataTable.SARPrice"),
      type: "price",
      currency: "SAR",
      hidden: userRole != "Admin",
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
      accessorKey: "numberOfReviews",
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
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    {
      accessorKey: "images",
      label: "images",
      hidden: true,
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: ["id", "name", "productType", "images"] },
  ];

  const filterColumns = {
    type: columnsDefinition.find(({ accessorKey }) => accessorKey == "productType")!,
    isFeatured: columnsDefinition.find(({ accessorKey }) => accessorKey == "isFeatured")!,
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
  ];

  return { columnsDefinition, searchableColumns, filters };
}
