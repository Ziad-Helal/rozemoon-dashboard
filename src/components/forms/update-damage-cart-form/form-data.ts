import { maxFileUploadSize } from "@/lib/constants";
import { formatBytes } from "@/lib/utils";
import { formatNumber, type Language } from "@/localization";
import { useUpdateDamageCartItems } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";
export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  cartQuantity: z.number({ invalid_type_error: t("forms.errors.number") }).positive(t("forms.errors.positive")),
  damageReason: z.string().optional(),
  damageImages: z
    .array(z.instanceof(File))
    .max(2)
    .refine((damageImages) => damageImages.every((file) => file.size <= maxFileUploadSize), `${t("forms.errors.maxFileSize")} ${formatBytes(maxFileUploadSize)}`)
    .optional(),
});

const defaultValues: FormFields = {
  cartQuantity: 0,
};

export function useFormDataGetter(initialValues?: FormFields, maxQuantity?: number) {
  const { t, i18n } = useTranslation();
  const mutation = useUpdateDamageCartItems();
  const refinedSchema = maxQuantity ? formSchema.refine(({ cartQuantity }) => cartQuantity <= maxQuantity, { path: ["cartQuantity"], message: t("forms.errors.max") }) : formSchema;
  const inputFields: InputField<FormFields>[] = [
    {
      id: "cartQuantity",
      label: t("forms.labels.quantity"),
      type: "number",
      placeholder: formatNumber(i18n.language as Language, maxQuantity || 0, "decimal") as string,
      autoFocus: true,
    },
    {
      id: "damageReason",
      label: t("forms.labels.reason"),
      type: "textarea",
    },
    {
      id: "damageImages",
      label: t("forms.labels.uploadImages"),
      type: "file",
      accept: { ".jpeg": [], ".png": [] },
      maxFilesCount: 2,
      maxFileSize: maxFileUploadSize,
    },
  ];
  return { formSchema: refinedSchema, inputFields, defaultValues: initialValues || defaultValues, mutation };
}
