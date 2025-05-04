import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";

interface FastOrder_Form_Props {
  products: {
    productId: number;
    quantity: number;
  }[];
  onSuccess?: VoidFunction;
}

export default function FastOrder_Form({ products, onSuccess }: FastOrder_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter();
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ ...values, status: values.status!, paymentWay: values.paymentWay!, orderItems: products }).then((response) => {
      onSuccess?.();
      return response;
    });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      fieldsContainerClassName="space-y-0 grid gap-3 lg:grid-cols-2"
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      submittingPhrase={t("forms.confirmOrder")}
      submitButtonClassName="w-full"
    />
  );
}
