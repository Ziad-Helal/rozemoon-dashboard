import { AdvancedForm } from "@/components/ui";
import { useFormData } from "@/hooks/form";
import type { DamagedItem } from "@/types/api-types";
import { useTranslation } from "react-i18next";
import { FormFields, useFormDataGetter } from "./form-data";

interface UpdateDamageCart_Form_Props {
  defaultValues: FormFields;
  product: Omit<DamagedItem, "reason" | "damagedImages">;
  onSuccess?: VoidFunction;
}

export default function UpdateDamageCart_Form({ defaultValues, product, onSuccess }: UpdateDamageCart_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(defaultValues);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ ...product, ...values }).then((response) => {
      onSuccess?.();
      return response;
    });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      submittingPhrase={defaultValues.cartQuantity ? t("forms.update") : t("forms.add")}
      submitButtonClassName="w-full"
    />
  );
}
