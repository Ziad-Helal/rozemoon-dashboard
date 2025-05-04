import { useCreateSetting, useUpdateSetting } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  setting: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(1, t("forms.errors.stringMin")),
  value: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(1, t("forms.errors.stringMin")),
  description: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(1, t("forms.errors.stringMin")),
  isHidden: z.boolean(),
});

export function useFormDataGetter(initialValues?: FormFields) {
  const { t } = useTranslation();
  const mutation = initialValues ? useUpdateSetting() : useCreateSetting();
  const inputFields: InputField<FormFields>[] = [
    { id: "value", label: t("forms.labels.value"), type: "text", autoFocus: !!initialValues },
    { id: "description", label: t("forms.labels.description.default"), type: "textarea" },
    { id: "isHidden", label: t("forms.labels.hide"), type: "switch" },
  ];
  if (!initialValues) inputFields.unshift({ id: "setting", label: t("forms.labels.settingId"), type: "text", autoFocus: !!!initialValues });
  const defaultValues: FormFields = initialValues || {
    setting: "",
    value: "",
    description: "",
    isHidden: true,
  };
  return { formSchema, inputFields, defaultValues, mutation };
}
