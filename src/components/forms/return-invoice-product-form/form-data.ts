import { maxFileUploadSize } from "@/lib/constants";
import { formatBytes } from "@/lib/utils";
import { useCreateReturnInvoice } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(0),
  returnReason: z.string().optional(),
  returnImages: z
    .array(z.instanceof(File))
    .max(2)
    .refine((returnImages) => returnImages.every((file) => file.size <= maxFileUploadSize), `${t("forms.errors.maxFileSize")} ${formatBytes(maxFileUploadSize)}`)
    .optional(),
});

export function useFormDataGetter(productId: number, maxQuantity: number) {
  const { t } = useTranslation();
  const mutation = useCreateReturnInvoice();

  const refinedSchema = formSchema.refine(({ quantity }) => quantity <= maxQuantity, { message: t("forms.errors.max"), path: ["quantity"] });

  const defaultValues: FormFields = {
    productId,
    quantity: 0,
  };

  const inputFields: InputField<FormFields>[] = [
    { id: "productId", label: t("forms.labels.productId"), type: "text", containerClassName: "hidden", disabled: true },
    { id: "quantity", label: t("forms.labels.quantity"), type: "quantity" },
    { id: "returnReason", label: t("forms.labels.reason"), type: "textarea" },
    { id: "returnImages", label: t("forms.labels.uploadImages"), type: "file", accept: { ".jpeg": [], ".png": [] }, maxFilesCount: 2, maxFileSize: maxFileUploadSize },
  ];

  return { formSchema: refinedSchema, inputFields, defaultValues, mutation };
}
