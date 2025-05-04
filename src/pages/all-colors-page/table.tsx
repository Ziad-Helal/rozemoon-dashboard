import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "name", "hexValue"];

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
      accessorKey: "nameLocalized",
      label: t("dataTable.name"),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      label: "name",
      enableSorting: false,
      hidden: true,
    },
    {
      accessorKey: "hexValue",
      label: t("dataTable.color"),
      type: "color",
      enableSorting: false,
    },
    {
      accessorKey: "numberOfProducts",
      label: t("dataTable.products"),
      type: "number",
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
      accessorKey: "createdAt",
      label: t("dataTable.createdAt"),
      type: "date",
    },
    {
      accessorKey: "name_ar",
      label: "name_ar",
      hidden: true,
    },
    {
      accessorKey: "name_bn",
      label: "name_bn",
      hidden: true,
    },
    {
      accessorKey: "name_de",
      label: "name_de",
      hidden: true,
    },
    {
      accessorKey: "name_fr",
      label: "name_fr",
      hidden: true,
    },
    {
      accessorKey: "name_hi",
      label: "name_hi",
      hidden: true,
    },
    {
      accessorKey: "name_it",
      label: "name_it",
      hidden: true,
    },
    {
      accessorKey: "name_ku",
      label: "name_ku",
      hidden: true,
    },
    {
      accessorKey: "name_nl",
      label: "name_nl",
      hidden: true,
    },
    {
      accessorKey: "name_pt",
      label: "name_pt",
      hidden: true,
    },
    {
      accessorKey: "name_ru",
      label: "name_ru",
      hidden: true,
    },
    {
      accessorKey: "name_tr",
      label: "name_tr",
      hidden: true,
    },
    {
      accessorKey: "name_ur",
      label: "name_ur",
      hidden: true,
    },
    {
      accessorKey: "name_zh",
      label: "name_zh",
      hidden: true,
    },
    {
      accessorKey: "actions",
      label: t("dataTable.actions"),
      type: "actions",
      actions: Actions,
      actionsProps: [
        "id",
        "isHidden",
        "hexValue",
        "name",
        "name_ar",
        "name_bn",
        "name_de",
        "name_fr",
        "name_hi",
        "name_it",
        "name_ku",
        "name_nl",
        "name_pt",
        "name_ru",
        "name_tr",
        "name_ur",
        "name_zh",
      ],
    },
  ];

  const filterColumns = {
    isHidden: columnsDefinition.find(({ accessorKey }) => accessorKey == "isHidden")!,
  };

  const filters: Filter[] = [
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
