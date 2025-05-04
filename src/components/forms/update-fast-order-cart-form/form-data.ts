import { useUpdateFastOrderCart } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";
export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  cartQuantity: z.number({ invalid_type_error: t("forms.errors.number") }).positive(t("forms.errors.positive")),
});

const defaultValues: FormFields = {
  cartQuantity: 0,
};

export function useFormDataGetter(maxQuantity: number, initialValues?: FormFields) {
  const { t } = useTranslation();
  const mutation = useUpdateFastOrderCart();
  const inputFields: InputField<FormFields>[] = [{ id: "cartQuantity", label: t("forms.labels.quantity"), type: "number", autoFocus: true }];
  const newFormSchecma = formSchema.refine(({ cartQuantity }) => cartQuantity <= maxQuantity, { message: t("forms.errors.stockShortage"), path: ["cartQuantity"] });
  return { formSchema: newFormSchecma, inputFields, defaultValues: initialValues || defaultValues, mutation };
}
