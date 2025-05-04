import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useCreateFastOrder } from "@/queries";
import { AuthenticatedUser } from "@/types/api-types";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";
export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    branchId: z.number({ invalid_type_error: t("forms.errors.number") }).positive(t("forms.errors.positive")),
    currency: z.enum(["SAR", "USD"], { invalid_type_error: t("forms.errors.selectOne") }),
    status: z.enum(["Pending", "Delivering", "Delivered"], { invalid_type_error: t("forms.errors.selectOne") }).nullable(),
    paymentWay: z.enum(["Cash", "CreditCard", "BankTransfer", "Cheque", "COD", "Other"], { invalid_type_error: t("forms.errors.selectOne") }).nullable(),
    deliveryAddress: z.string({ invalid_type_error: t("forms.errors.string") }),
    deliveryDate: z.date(),
    extraDiscountAmount: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .optional(),
    taxAmount: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .optional(),
    note: z.string({ invalid_type_error: t("forms.errors.string") }).optional(),
  })
  .refine(({ status }) => status !== null, { message: "Required", path: ["status"] })
  .refine(({ paymentWay }) => paymentWay !== null, { message: "Required", path: ["paymentWay"] });

export function useFormDataGetter() {
  const { t } = useTranslation();
  const mutation = useCreateFastOrder();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const inputFields: InputField<FormFields>[] = [
    {
      id: "status",
      label: t("forms.labels.status"),
      type: "select",
      triggerPlaceholder: t("forms.placeholders.selectOne"),
      options: [
        { label: t("types&statuses.fastOrderStatus.Pending"), value: "Pending" },
        { label: t("types&statuses.fastOrderStatus.Delivering"), value: "Delivering" },
        { label: t("types&statuses.fastOrderStatus.Delivered"), value: "Delivered" },
      ],
      autoFocus: true,
    },
    {
      id: "paymentWay",
      label: t("forms.labels.paymentMethod"),
      type: "select",
      triggerPlaceholder: t("forms.placeholders.selectOne"),
      options: [
        { label: t("types&statuses.paymentMethods.Cash"), value: "Cash" },
        { label: t("types&statuses.paymentMethods.CreditCard"), value: "CreditCard" },
        { label: t("types&statuses.paymentMethods.BankTransfer"), value: "BankTransfer" },
        { label: t("types&statuses.paymentMethods.Cheque"), value: "Cheque" },
        { label: t("types&statuses.paymentMethods.COD"), value: "COD" },
        { label: t("types&statuses.paymentMethods.Other"), value: "Other" },
      ],
    },
    {
      id: "deliveryAddress",
      label: t("forms.labels.address.default"),
      type: "text",
    },
    {
      id: "deliveryDate",
      label: t("forms.labels.date"),
      type: "date",
    },
    {
      id: "extraDiscountAmount",
      label: t("forms.labels.extraDiscount"),
      type: "number",
    },
    {
      id: "taxAmount",
      label: t("forms.labels.taxes"),
      type: "number",
    },
    {
      id: "note",
      label: t("forms.labels.notes"),
      type: "textarea",
      containerClassName: "lg:col-span-full",
    },
  ];
  const defaultValues: FormFields = {
    branchId: +user?.branchId!,
    currency: "SAR",
    status: null,
    paymentWay: null,
    deliveryAddress: "",
    deliveryDate: new Date(),
    extraDiscountAmount: undefined,
    taxAmount: undefined,
    note: "",
  };

  return { formSchema, inputFields, defaultValues, mutation };
}
