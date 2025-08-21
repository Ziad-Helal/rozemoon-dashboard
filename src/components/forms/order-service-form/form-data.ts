import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { z } from "zod";
import type { InputField } from "@/types/form-types";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    service: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    value: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .nullable(),
  })
  .refine(({ value }) => value != null, { path: ["value"], message: t("forms.errors.required") });

export function useFormDataGetter(initialData?: FormFields) {
  const { t } = useTranslation();

  const defaultValues: FormFields = initialData || {
    service: "",
    value: null,
  };

  const inputFields: InputField<FormFields>[] = [
    { id: "service", label: t("forms.labels.service"), type: "text" },
    { id: "value", label: t("forms.labels.amount"), type: "number" },
  ];

  return { formSchema, inputFields, defaultValues };
}
