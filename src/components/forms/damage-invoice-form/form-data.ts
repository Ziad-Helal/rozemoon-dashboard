import { maxFileUploadSize } from "@/lib/constants";
import { formatBytes } from "@/lib/utils";
import { useCreateDamageInvoice, useUpdateDamageCartItems } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  orderId: z.string(),
  reason: z.string().optional(),
  damagedImages: z
    .array(z.instanceof(File))
    .max(2)
    .refine((damagedImages) => damagedImages.every((file) => file.size <= maxFileUploadSize), `${t("forms.errors.maxFileSize")} ${formatBytes(maxFileUploadSize)}`)
    .optional(),
});

export function useFormDataGetter(orderId?: string) {
  const { t } = useTranslation();
  const mutation = orderId ? useCreateDamageInvoice() : useUpdateDamageCartItems();

  const defaultValues: FormFields = {
    orderId: orderId || "",
  };

  const inputFields: InputField<FormFields>[] = [
    { id: "reason", label: t("forms.labels.reason"), type: "textarea", autoFocus: true },
    { id: "damagedImages", label: t("forms.labels.uploadImages"), type: "file", accept: { ".jpeg": [], ".png": [] }, maxFilesCount: 2, maxFileSize: maxFileUploadSize },
  ];

  if (orderId) inputFields.unshift({ id: "orderId", label: t("forms.labels.productId"), type: "text", disabled: true });

  return { formSchema, inputFields, defaultValues, mutation };
}
