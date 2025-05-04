import { useCreateReturnRequest } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    quantity: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .nullable(),
    reason: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
  })
  .refine(({ quantity }) => quantity != null, { message: t("forms.errors.required"), path: ["quantity"] });

const defaultValues: FormFields = {
  quantity: null,
  reason: "",
};

export function useFormDataGetter() {
  const { t } = useTranslation();
  const mutation = useCreateReturnRequest();
  const inputFields: InputField<FormFields>[] = [
    { id: "reason", type: "textarea", placeholder: t("forms.labels.reason"), rows: 3 },
    { id: "quantity", type: "quantity", placeholder: t("forms.labels.quantity") },
  ];
  return { formSchema, inputFields, defaultValues, mutation };
}
