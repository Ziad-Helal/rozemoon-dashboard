import { useUpdateUserWallet } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";
export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    amount: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .nullable(),
    notes: z.string({ invalid_type_error: t("forms.errors.string") }),
  })
  .refine(({ amount }) => amount != null, { message: t("forms.errors.required"), path: ["amount"] });

const defaultValues: FormFields = {
  amount: null,
  notes: "",
};

export function useFormDataGetter() {
  const { t } = useTranslation();
  const mutation = useUpdateUserWallet();
  const inputFields: InputField<FormFields>[] = [
    {
      id: "amount",
      label: t("forms.labels.amount"),
      type: "number",
      autoFocus: true,
    },
    { id: "notes", label: t("forms.labels.notes"), type: "textarea" },
  ];
  return { formSchema, inputFields, defaultValues, mutation };
}
