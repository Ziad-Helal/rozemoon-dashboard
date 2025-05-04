import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";

interface ProductPreparedQuantity_Form_Props {
  bookingId: number;
  productId: number;
  quantity: number;
}

export default function ProductPreparedQuantity_Form({ bookingId, productId, quantity }: ProductPreparedQuantity_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(quantity);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit({ requestBody: { bookingId, preparedProducts: [{ productId, quantity: Math.abs(values.quantity!) }] }, operation: values.quantity! > 0 ? "add" : "reduce" });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      className="mt-2 flex gap-1 items-start"
      fieldsContainerClassName="flex-1"
      actionsContainerClassName="mt-0 [&>button]:h-9"
      submittingPhrase={t("forms.prepare")}
      isSubmitting={isSubmitting}
    />
  );
}
