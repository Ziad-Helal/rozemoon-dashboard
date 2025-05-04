import { useCreateCompanyReview, useUpdateCompanyReview } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(1, t("forms.errors.stringMin")),
  message: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(10, t("forms.errors.stringMin")),
  isHidden: z.boolean(),
});

export function useFormDataGetter(initialValues?: FormFields) {
  const { t } = useTranslation();
  const mutation = initialValues ? useUpdateCompanyReview() : useCreateCompanyReview();
  const inputFields: InputField<FormFields>[] = [
    { id: "name", label: t("forms.labels.name.default"), type: "text", autoFocus: true },
    { id: "message", label: t("forms.labels.review"), type: "textarea" },
    { id: "isHidden", label: t("forms.labels.hide"), type: "switch" },
  ];
  const defaultValues: FormFields = initialValues || {
    name: "",
    message: "",
    isHidden: true,
  };

  return { formSchema, inputFields, defaultValues, mutation };
}
