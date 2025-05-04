import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

export default function useTable() {
  const { i18n, t } = useTranslation();
  const language = i18n.language;

  const nameKey = `name${language == "en" ? "" : `_${language}`}`;
  const descriptionKey = `description${language == "en" ? "" : `_${language}`}`;

  const searchableColumns = ["id", "name", "description", "createdBy"];

  const columnsDefinition: Column<Actions_Props>[] = [
    {
      accessorKey: "id",
      label: t("dataTable.id"),
      type: "number",
      enableHiding: false,
    },
    {
      accessorKey: nameKey,
      label: t("dataTable.name"),
      enableSorting: false,
    },
    {
      accessorKey: descriptionKey,
      label: t("dataTable.description"),
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
      accessorKey: "createdBy",
      label: t("dataTable.createdBy"),
      type: "number",
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
      accessorKey: "description_ar",
      label: "description_ar",
      hidden: true,
    },
    {
      accessorKey: "description_bn",
      label: "description_bn",
      hidden: true,
    },
    {
      accessorKey: "description_de",
      label: "description_de",
      hidden: true,
    },
    {
      accessorKey: "description_fr",
      label: "description_fr",
      hidden: true,
    },
    {
      accessorKey: "description_hi",
      label: "description_hi",
      hidden: true,
    },
    {
      accessorKey: "description_it",
      label: "description_it",
      hidden: true,
    },
    {
      accessorKey: "description_ku",
      label: "description_ku",
      hidden: true,
    },
    {
      accessorKey: "description_nl",
      label: "description_nl",
      hidden: true,
    },
    {
      accessorKey: "description_pt",
      label: "description_pt",
      hidden: true,
    },
    {
      accessorKey: "description_ru",
      label: "description_ru",
      hidden: true,
    },
    {
      accessorKey: "description_tr",
      label: "description_tr",
      hidden: true,
    },
    {
      accessorKey: "description_ur",
      label: "description_ur",
      hidden: true,
    },
    {
      accessorKey: "description_zh",
      label: "description_zh",
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
        "description",
        "description_ar",
        "description_bn",
        "description_de",
        "description_fr",
        "description_hi",
        "description_it",
        "description_ku",
        "description_nl",
        "description_pt",
        "description_ru",
        "description_tr",
        "description_ur",
        "description_zh",
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
