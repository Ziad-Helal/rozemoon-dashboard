import { useSendNotification } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    title: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    message: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    type: z.enum(["Info", "Booking", "Order", "Wallet", "Subscription"], { invalid_type_error: t("forms.errors.selectOne") }).nullable(),
    receiver: z.enum(["All", "Clients", "Managers", "Storekeepers", "Cashiers", "User"], { invalid_type_error: t("forms.errors.selectOne") }),
    receiverId: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .nullable()
      .optional(),
  })
  .refine(({ receiver, type }) => receiver != "User" || type != null, { message: t("forms.errors.required"), path: ["type"] })
  .refine(({ receiver, receiverId }) => receiver != "User" || receiverId != null, { message: t("forms.errors.required"), path: ["receiverId"] });

const defaultValues: FormFields = {
  title: "",
  message: "",
  type: null,
  receiver: "Clients",
  receiverId: null,
};

export function useFormDataGetter() {
  const { t } = useTranslation();
  const mutation = useSendNotification();
  const inputFields: InputField<FormFields>[] = [
    {
      id: "receiver",
      label: t("forms.labels.receiver"),
      type: "select",
      options: [
        { label: t("keyWords.all"), value: "All" },
        { label: t("keyWords.clients"), value: "Clients" },
        { label: t("keyWords.managers"), value: "Managers" },
        { label: t("keyWords.storekeepers"), value: "Storekeepers" },
        { label: t("keyWords.cashiers"), value: "Cashiers" },
        { label: t("keyWords.specificAccount"), value: "User" },
      ],
      triggerPlaceholder: t("forms.placeholders.selectOne"),
      autoFocus: true,
    },
    { id: "receiverId", label: t("dataTable.receiverId"), type: "number", containerClassName: "hidden" },
    {
      id: "type",
      label: t("forms.labels.notificationType"),
      type: "select",
      options: [
        { label: t("types&statuses.notificationTypes.Info"), value: "Info" },
        { label: t("types&statuses.notificationTypes.Order"), value: "Order" },
        { label: t("types&statuses.notificationTypes.Booking"), value: "Booking" },
        { label: t("types&statuses.notificationTypes.Wallet"), value: "Wallet" },
        { label: t("types&statuses.notificationTypes.Subscription"), value: "Subscription" },
      ],
      triggerPlaceholder: t("forms.placeholders.selectOne"),
      containerClassName: "hidden",
    },
    { id: "title", label: t("forms.labels.title"), type: "text" },
    { id: "message", label: t("forms.labels.message"), type: "textarea" },
  ];
  return { formSchema, inputFields, defaultValues, mutation };
}
