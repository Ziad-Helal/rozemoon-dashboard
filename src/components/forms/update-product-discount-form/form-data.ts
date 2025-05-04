import { useApplyDiscount, useChangeDiscount } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    discountId: z.number({ invalid_type_error: t("forms.errors.number") }).nullable(),
  })
  .refine(({ discountId }) => discountId != null, { message: t("forms.errors.required"), path: ["discountId"] });

export function useFormDataGetter(discountId?: number) {
  const { t } = useTranslation();
  const mutation = discountId ? useChangeDiscount() : useApplyDiscount();
  const inputFields: InputField<FormFields>[] = [
    {
      id: "discountId",
      label: t("forms.labels.discountId"),
      type: "number",
      autoFocus: true,
    },
  ];
  const defaultValues: FormFields = {
    discountId: discountId || null,
  };

  return { formSchema, inputFields, defaultValues, mutation };
}
