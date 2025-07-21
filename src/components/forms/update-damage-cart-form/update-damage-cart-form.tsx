import { AdvancedForm } from "@/components/ui";
import { useFormData } from "@/hooks/form";
import type { Damage_CartItem } from "@/types/api-types";
import { useTranslation } from "react-i18next";
import { FormFields, useFormDataGetter } from "./form-data";

interface UpdateDamageCart_Form_Props {
  defaultValues: FormFields;
  product: Damage_CartItem;
  maxQuantity: number;
  onSuccess?: VoidFunction;
}

export default function UpdateDamageCart_Form({ defaultValues, product, maxQuantity, onSuccess }: UpdateDamageCart_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(defaultValues, maxQuantity);
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
