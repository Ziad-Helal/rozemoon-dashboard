import { useSignIn } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z.string({ invalid_type_error: t("forms.errors.string") }).email(t("forms.errors.email")),
  password: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .min(6, t("forms.errors.stringMin"))
    .max(100, t("forms.errors.stringMax")),
});

const defaultValues: FormFields = {
  email: "",
  password: "",
};

export function useFormDataGetter() {
  const { t } = useTranslation();
  const mutation = useSignIn();
  const inputFields: InputField<FormFields>[] = [
    { id: "email", label: t("forms.labels.email"), type: "text", autoFocus: true },
    { id: "password", label: t("forms.labels.password"), type: "password" },
  ];
  return { formSchema, inputFields, defaultValues, mutation };
}
