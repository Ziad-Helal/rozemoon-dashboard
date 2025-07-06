import { maxFileUploadSize } from "@/lib/constants";
import { formatBytes } from "@/lib/utils";
import { useCreateReturnInvoice } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  orderId: z.string(),
  reason: z.string().optional(),
  returnImages: z
    .array(z.instanceof(File))
    .max(2)
    .refine((returnImages) => returnImages.every((file) => file.size <= maxFileUploadSize), `${t("forms.errors.maxFileSize")} ${formatBytes(maxFileUploadSize)}`)
    .optional(),
});

export function useFormDataGetter(orderId: string) {
  const { t } = useTranslation();
  const mutation = useCreateReturnInvoice();

  const defaultValues: FormFields = {
    orderId,
  };

  const inputFields: InputField<FormFields>[] = [
    { id: "orderId", label: t("forms.labels.productId"), type: "text", disabled: true },
    { id: "reason", label: t("forms.labels.reason"), type: "textarea", autoFocus: true },
    { id: "returnImages", label: t("forms.labels.uploadImages"), type: "file", accept: { ".jpeg": [], ".png": [] }, maxFilesCount: 2, maxFileSize: maxFileUploadSize },
  ];

  return { formSchema, inputFields, defaultValues, mutation };
}
