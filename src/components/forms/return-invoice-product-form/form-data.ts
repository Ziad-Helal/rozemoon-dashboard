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
  reason: z.string().optional(),
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
    { id: "productId", label: "product id", type: "text", containerClassName: "hidden", disabled: true },
    { id: "quantity", label: "quantity", type: "quantity" },
    { id: "reason", label: "return reason", type: "textarea" },
    { id: "returnImages", label: "photos", type: "file", maxFilesCount: 2, maxFileSize: maxFileUploadSize },
  ];

  return { formSchema: refinedSchema, inputFields, defaultValues, mutation };
}
