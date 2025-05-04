import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { Refill_CartItem } from "@/types/api-types";
import { useTranslation } from "react-i18next";

interface UpdateRefillCart_Form_Props {
  defaultValues: FormFields;
  product: Omit<Refill_CartItem, "purchasePrice" | "cartQuantity">;
  onSuccess?: VoidFunction;
}

export default function UpdateRefillCart_Form({ defaultValues, product, onSuccess }: UpdateRefillCart_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(defaultValues);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ ...product, ...values, purchasePrice: values.purchasePrice! }).then((response) => {
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
