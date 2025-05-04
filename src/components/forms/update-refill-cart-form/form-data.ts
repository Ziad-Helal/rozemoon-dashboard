import { useUpdateRefillCart } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";
export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    cartQuantity: z.number({ invalid_type_error: t("forms.errors.number") }).positive(t("forms.errors.positive")),
    purchasePrice: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .nullable(),
  })
  .refine(({ purchasePrice }) => purchasePrice != null, { message: t("forms.errors.required"), path: ["purchasePrice"] });

const defaultValues: FormFields = {
  cartQuantity: 0,
  purchasePrice: null,
};

export function useFormDataGetter(initialValues?: FormFields) {
  const { t } = useTranslation();
  const mutation = useUpdateRefillCart();
  const inputFields: InputField<FormFields>[] = [
    { id: "cartQuantity", label: t("forms.labels.quantity"), type: "number", autoFocus: true },
    { id: "purchasePrice", label: t("forms.labels.price"), type: "number" },
  ];
  return { formSchema, inputFields, defaultValues: initialValues || defaultValues, mutation };
}
