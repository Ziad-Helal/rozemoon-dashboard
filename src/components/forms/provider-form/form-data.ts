import { useCreateProvider, useUpdateProvider } from "@/queries";
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
  phone: z.string({ invalid_type_error: t("forms.errors.string") }).regex(/^[0-9]{3,11}$/, t("forms.errors.phone")),
  email: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .email(t("forms.errors.email"))
    .optional(),
  address: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(1, t("forms.errors.stringMin"))
    .optional(),
  notes: z.string({ invalid_type_error: t("forms.errors.string") }).optional(),
  isActive: z.boolean(),
});

export function useFormDataGetter(initialValues?: FormFields) {
  const { t } = useTranslation();
  const mutation = initialValues ? useUpdateProvider() : useCreateProvider();
  const inputFields: InputField<FormFields>[] = [
    { id: "name", label: t("forms.labels.name.default"), type: "text", autoFocus: true },
    { id: "phone", label: t("forms.labels.phone"), type: "tel" },
    { id: "email", label: t("forms.labels.email"), type: "email" },
    { id: "address", label: t("forms.labels.address.default"), type: "text" },
    { id: "notes", label: t("forms.labels.notes"), type: "textarea" },
    { id: "isActive", label: t("forms.labels.activate"), type: "switch" },
  ];
  const defaultValues: FormFields = initialValues || {
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    isActive: true,
  };
  return { formSchema, inputFields, defaultValues, mutation };
}
