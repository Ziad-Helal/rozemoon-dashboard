import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";

interface ProductReturn_Form_Props {
  orderId: number;
  productId: number;
}

export default function ProductReturn_Form({ orderId, productId }: ProductReturn_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter();
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit({ orderId, productId, ...values, quantity: values.quantity! });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      className="mt-2 flex gap-1 items-end"
      fieldsContainerClassName="flex-1"
      actionsContainerClassName="mt-0 [&>button]:h-9"
      submittingPhrase={t("forms.return")}
      isSubmitting={isSubmitting}
    />
  );
}
