import { useRejectScheduledOrder } from "@/queries";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  note: z.string({ invalid_type_error: t("forms.errors.string") }),
});

const defaultValues: FormFields = {
  note: "",
};

export function useFormDataGetter() {
  const { t } = useTranslation();
  const mutation = useRejectScheduledOrder();
  const inputFields: InputField<FormFields>[] = [{ id: "note", label: t("forms.labels.notes"), type: "textarea", autoFocus: true }];
  return { formSchema, inputFields, defaultValues, mutation };
}
