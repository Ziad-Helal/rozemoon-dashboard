import { useChangePassword } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  currentPassword: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(6, t("forms.errors.stringMin")),
  newPassword: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(6, t("forms.errors.stringMin")),
});

const defaultValues: FormFields = {
  currentPassword: "",
  newPassword: "",
};

export function useFormDataGetter() {
  const { t } = useTranslation();
  const mutation = useChangePassword();
  const inputFields: InputField<FormFields>[] = [
    { id: "currentPassword", label: t("forms.labels.currentPassword"), type: "password", autoFocus: true },
    { id: "newPassword", label: t("forms.labels.newPassword"), type: "password" },
  ];
  return { formSchema, inputFields, defaultValues, mutation };
}
