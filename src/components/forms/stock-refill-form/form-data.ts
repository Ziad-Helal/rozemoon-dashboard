import { useCreateRefill } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";
export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    providerId: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .nullable(),
    currency: z.enum(["SAR", "USD"], { invalid_type_error: t("forms.errors.selectOne") }),
  })
  .refine(({ providerId }) => providerId !== null, { message: t("forms.errors.required"), path: ["providerId"] });

export function useFormDataGetter() {
  const { t } = useTranslation();
  const mutation = useCreateRefill();
  const inputFields: InputField<FormFields>[] = [
    {
      id: "providerId",
      label: t("forms.labels.providerId"),
      type: "number",
      autoFocus: true,
    },
  ];
  const defaultValues: FormFields = {
    providerId: null,
    currency: "SAR",
  };

  return { formSchema, inputFields, defaultValues, mutation };
}
