import { Column } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "name", "description", "name"];

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
      accessorKey: "description",
      label: t("dataTable.description"),
      enableSorting: false,
    },
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: [] },
  ];

  return { columnsDefinition, searchableColumns };
}
