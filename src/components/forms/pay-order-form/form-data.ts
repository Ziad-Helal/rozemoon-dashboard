import { usePayForScheduledOrder } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  amount: z.number({ invalid_type_error: t("forms.errors.number") }).positive(t("forms.errors.positive")),
  paymentMethod: z.enum(["Cash", "CreditCard", "BankTransfer", "Cheque", "COD", "Other"]),
});

const defaultValues: FormFields = {
  amount: 0,
  paymentMethod: "Cash",
};

export function useFormDataGetter(maximumAmount: number) {
  const { t } = useTranslation();
  const mutation = usePayForScheduledOrder();
  const newFormSchema = formSchema.refine(({ amount }) => amount <= maximumAmount, { path: ["amount"], message: t("forms.errors.max") });
  const inputFields: InputField<FormFields>[] = [
    { id: "amount", label: t("forms.labels.amount"), type: "number", autoFocus: true },
    {
      id: "paymentMethod",
      label: t("forms.labels.paymentMethod"),
      type: "select",
      triggerPlaceholder: t("forms.placeholders.selectOne"),
      options: [
        { label: t("types&statuses.paymentMethods.COD"), value: "COD" },
        { label: t("types&statuses.paymentMethods.Cash"), value: "Cash" },
        { label: t("types&statuses.paymentMethods.CreditCard"), value: "CreditCard" },
        { label: t("types&statuses.paymentMethods.BankTransfer"), value: "BankTransfer" },
        { label: t("types&statuses.paymentMethods.Cheque"), value: "Cheque" },
        { label: t("types&statuses.paymentMethods.Other"), value: "Other" },
      ],
    },
  ];
  return { formSchema: newFormSchema, inputFields, defaultValues, mutation };
}
