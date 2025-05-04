import { AdvancedForm } from "@/components/ui";
import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { UpdateDiscount_Request } from "@/types/api-types";
import { useTranslation } from "react-i18next";

interface Discount_Form_Props {
  discount?: UpdateDiscount_Request;
  onSuccess?: VoidFunction;
}

export default function Discount_Form({ discount, onSuccess }: Discount_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(discount);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ id: discount?.id || 0, ...values, percentage: values.percentage! }).then((response) => {
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
      fieldsContainerClassName="space-y-0 grid gap-3 grid-cols-1 lg:grid-cols-2"
      actionsContainerClassName="[&>button]:w-full"
      submittingPhrase={discount ? t("forms.update") : t("forms.create")}
      resetFormButton={!!!discount}
    />
  );
}
