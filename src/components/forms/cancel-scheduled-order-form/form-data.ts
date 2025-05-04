import { useCancelScheduledOrder } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  reason: z.string({ invalid_type_error: t("forms.errors.string") }),
  refundAmount: z.number({ invalid_type_error: t("forms.errors.number") }).min(0, t("forms.errors.min0")),
});

const defaultValues: FormFields = {
  reason: "",
  refundAmount: 0,
};

export function useFormDataGetter(maxRefund: number) {
  const { t } = useTranslation();
  const mutation = useCancelScheduledOrder();
  const newFormSchema = formSchema.refine(({ refundAmount }) => refundAmount <= maxRefund, { message: t("forms.errors.maxedClientPayment"), path: ["refundAmount"] });
  const inputFields: InputField<FormFields>[] = [
    { id: "reason", label: t("forms.labels.reason"), type: "textarea", autoFocus: true },
    { id: "refundAmount", label: t("forms.labels.refund"), type: "number" },
  ];

  return { formSchema: newFormSchema, inputFields, defaultValues, mutation };
}
