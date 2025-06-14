import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { z } from "zod";
import type { InputField } from "@/types/form-types";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  guestName: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(1, t("forms.errors.stringMin")),
  guestPhone: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(1, t("forms.errors.stringMin")),
});

export function useFormDataGetter(initialData?: FormFields) {
  const { t } = useTranslation();

  const defaultValues: FormFields = initialData || {
    guestName: "",
    guestPhone: "",
  };

  const inputFields: InputField<FormFields>[] = [
    { id: "guestName", label: t("forms.labels.name.default"), type: "text", autoFocus: true },
    { id: "guestPhone", label: t("forms.labels.phone"), type: "tel" },
  ];

  return { formSchema, inputFields, defaultValues };
}
