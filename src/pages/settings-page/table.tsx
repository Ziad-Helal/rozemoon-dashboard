import { Column } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns: string[] = [];

export default function useTable() {
  const { t } = useTranslation();

  const columnsDefinition: Column<Actions_Props>[] = [
    {
      accessorKey: "setting",
      label: t("dataTable.id"),
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: "value",
      label: t("dataTable.value"),
      enableSorting: false,
    },
    {
      accessorKey: "description",
      label: t("dataTable.description"),
      enableSorting: false,
    },
    {
      accessorKey: "isHidden",
      label: t("dataTable.isHidden"),
      type: "boolean",
      falseIsDestructive: true,
      enableSorting: false,
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: ["setting", "value", "description", "isHidden"] },
  ];

  return { columnsDefinition, searchableColumns };
}
