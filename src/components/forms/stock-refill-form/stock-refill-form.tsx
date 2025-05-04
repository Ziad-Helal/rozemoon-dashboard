import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";

interface StockRefill_Form_Props {
  products: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  onSuccess?: VoidFunction;
}

export default function StockRefill_Form({ products, onSuccess }: StockRefill_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter();
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ items: products, ...values, providerId: values.providerId! }).then((response) => {
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
      submittingPhrase={t("forms.confirmRefillOrder")}
      submitButtonClassName="w-full"
    />
  );
}
