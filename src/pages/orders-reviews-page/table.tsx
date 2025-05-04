import { Column } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "orderId", "bookingRequestId"];

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
      accessorKey: "orderId",
      label: t("dataTable.fastOrderId"),
      type: "number",
    },
    {
      accessorKey: "bookingRequestId",
      label: t("dataTable.scheduledOrderId"),
      type: "number",
    },
    {
      accessorKey: "deliveryTime",
      label: t("dataTable.deliveryTime"),
      type: "number",
    },
    {
      accessorKey: "driverBehavior",
      label: t("dataTable.driverBehavior"),
      type: "number",
    },
    {
      accessorKey: "condition",
      label: t("dataTable.packagingCondition"),
      type: "number",
    },
    {
      accessorKey: "clientComment",
      label: t("dataTable.notes"),
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
