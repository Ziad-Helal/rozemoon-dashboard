import { Column, Filter } from "@/types/table-types";
import Actions, { Actions_Props } from "./actions";
import { useTranslation } from "react-i18next";

const searchableColumns = ["id", "firstName", "lastName", "email"];

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
      accessorKey: "firstName",
      label: t("dataTable.firstName"),
    },
    {
      accessorKey: "lastName",
      label: t("dataTable.lastName"),
    },
    {
      accessorKey: "email",
      label: t("dataTable.email"),
      enableSorting: false,
    },
    {
      accessorKey: "phoneNumber",
      label: t("dataTable.phone"),
      enableSorting: false,
    },
    {
      accessorKey: "countryCode",
      label: t("dataTable.country"),
      type: "country",
      enableSorting: false,
    },
    {
      accessorKey: "docVerifiedStatus",
      label: t("dataTable.status"),
      typeOrStatus: "userStatus",
      enableSorting: false,
    },
    {
      accessorKey: "status.note",
      label: t("dataTable.notes"),
      enableSorting: false,
    },
    {
      accessorKey: "wallet",
      label: t("dataTable.wallet"),
      type: "price",
    },
    {
      accessorKey: "currency",
      label: t("dataTable.currency"),
      hidden: true,
    },
    {
      accessorKey: "isConfirmedEmail",
      label: t("dataTable.verifiedEmail"),
      type: "boolean",
      falseIsDestructive: true,
      enableSorting: false,
    },
    {
      accessorKey: "sendNotificationToEmail",
      label: t("dataTable.emailNotifications"),
      type: "boolean",
      falseIsDestructive: true,
      enableSorting: false,
    },
    {
      accessorKey: "sendNotificationToWhatsapp",
      label: t("dataTable.whatsappNotifications"),
      type: "boolean",
      falseIsDestructive: true,
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
    { accessorKey: "actions", label: t("dataTable.actions"), type: "actions", actions: Actions, actionsProps: ["id", "email", "currency", "status"] },
  ];

  const filterColumns = {
    userStatus: columnsDefinition.find(({ accessorKey }) => accessorKey == "docVerifiedStatus")!,
    sendNotificationToEmail: columnsDefinition.find(({ accessorKey }) => accessorKey == "sendNotificationToEmail")!,
    sendNotificationToWhatsapp: columnsDefinition.find(({ accessorKey }) => accessorKey == "sendNotificationToWhatsapp")!,
    isConfirmedEmail: columnsDefinition.find(({ accessorKey }) => accessorKey == "isConfirmedEmail")!,
  };

  const filters: Filter[] = [
    {
      id: filterColumns.userStatus.accessorKey,
      label: filterColumns.userStatus.label,
      options: [
        { value: "under_review", label: t("types&statuses.userStatus.Under_review") },
        { value: "verified", label: t("types&statuses.userStatus.Verified") },
        { value: "denied", label: t("types&statuses.userStatus.Denied") },
        { value: "denied_forever", label: t("types&statuses.userStatus.Denied_forever") },
      ],
    },
    {
      id: filterColumns.isConfirmedEmail.accessorKey,
      label: filterColumns.isConfirmedEmail.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
    {
      id: filterColumns.sendNotificationToEmail.accessorKey,
      label: filterColumns.sendNotificationToEmail.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
    {
      id: filterColumns.sendNotificationToWhatsapp.accessorKey,
      label: filterColumns.sendNotificationToWhatsapp.label,
      options: [
        { value: true, label: t("keyWords.yes") },
        { value: false, label: t("keyWords.no") },
      ],
    },
  ];

  return { columnsDefinition, searchableColumns, filters };
}
