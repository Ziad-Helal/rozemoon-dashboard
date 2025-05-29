import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "couponString"];

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
      accessorKey: "couponString",
      label: t("dataTable.couponString"),
      enableSorting: false,
    },
    {
      accessorKey: "percentage",
      label: t("dataTable.percentage"),
      type: "percentage",
    },
    {
      accessorKey: "maxAmountSar",
      label: t("dataTable.maxSAR"),
      type: "price",
      currency: "SAR",
    },
    {
      accessorKey: "maxAmountUsd",
      label: t("dataTable.maxUSD"),
      type: "price",
      currency: "USD",
    },
    // {
    //   accessorKey: "maxNumOfRedeemsPerUser",
    //   label: t("dataTable.maxUsesPerUser"),
    //   type: "number",
    // },
    // {
    //   accessorKey: "maxRedeems",
    //   label: t("dataTable.maxUses"),
    //   type: "number",
    // },
    // {
    //   accessorKey: "userIds",
    //   label: t("dataTable.allowedUsers"),
    // },
    // {
    //   accessorKey: "bannedIds",
    //   label: t("dataTable.bannedUsers"),
    // },
    // {
    //   accessorKey: "countries",
    //   label: t("dataTable.allowedCountries"),
    // },
    {
      accessorKey: "isForOrder",
      label: t("dataTable.isForFastOrder"),
      type: "boolean",
      falseIsDestructive: true,
      enableSorting: false,
    },
    {
      accessorKey: "isForBooking",
      label: t("dataTable.isForScheduledOrder"),
      type: "boolean",
      falseIsDestructive: true,
      enableSorting: false,
    },
    {
      accessorKey: "isActivated",
      label: t("dataTable.isActive"),
      type: "boolean",
      falseIsDestructive: true,
      enableSorting: false,
    },
    {
      accessorKey: "expiryDateTime",
      label: t("dataTable.exprationDate"),
      type: "date",
    },
    {
      accessorKey: "actions",
      label: t("dataTable.actions"),
      type: "actions",
      actions: Actions,
      actionsProps: [
        "id",
        "bannedIds",
        "countries",
        "couponString",
        "expiryDateTime",
        "isActivated",
        "isForBooking",
        "isForOrder",
        "maxAmountSar",
        "maxAmountUsd",
        "maxNumOfRedeemsPerUser",
        "maxRedeems",
        "percentage",
        "userIds",
      ],
    },
  ];

  const filterColumns = {
    isActivated: columnsDefinition.find(({ accessorKey }) => accessorKey == "isActivated")!,
    isForOrder: columnsDefinition.find(({ accessorKey }) => accessorKey == "isForOrder")!,
    isForBooking: columnsDefinition.find(({ accessorKey }) => accessorKey == "isForBooking")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.isActivated.accessorKey,
      label: filterColumns.isActivated.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
    {
      id: filterColumns.isForOrder.accessorKey,
      label: filterColumns.isForOrder.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
    {
      id: filterColumns.isForBooking.accessorKey,
      label: filterColumns.isForBooking.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters };
}
