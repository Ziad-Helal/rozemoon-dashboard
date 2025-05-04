import { useAssignScheduledOrderToStore } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    branchId: z.number({ invalid_type_error: t("forms.errors.number") }).nullable(),
  })
  .refine(({ branchId }) => branchId != null, { message: t("forms.errors.required"), path: ["branchId"] });

const defaultValues: FormFields = {
  branchId: null,
};

export function useFormDataGetter() {
  const { t } = useTranslation();
  const mutation = useAssignScheduledOrderToStore();
  const inputFields: InputField<FormFields>[] = [{ id: "branchId", label: t("forms.labels.storeId"), type: "number", autoFocus: true }];
  return { formSchema, inputFields, defaultValues, mutation };
}
