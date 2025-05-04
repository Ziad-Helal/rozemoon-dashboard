import { usePrepareScheduledOrder } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    quantity: z.number({ invalid_type_error: t("forms.errors.number") }).nullable(),
  })
  .refine(({ quantity }) => quantity != null, { message: t("forms.errors.required"), path: ["quantity"] });

const inputFields: InputField<FormFields>[] = [{ id: "quantity", type: "quantity" }];

export function useFormDataGetter(quantity: number) {
  const mutation = usePrepareScheduledOrder();
  const defaultValues: FormFields = {
    quantity: quantity || null,
  };

  return { formSchema, inputFields, defaultValues, mutation };
}
