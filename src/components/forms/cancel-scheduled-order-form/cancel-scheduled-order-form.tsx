import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";

export interface CancelScheduledOrder_Form_Props {
  bookingId: number;
  paidAmount: number;
}

export default function CancelScheduledOrder_Form({ bookingId, paidAmount }: CancelScheduledOrder_Form_Props) {
  const {t} = useTranslation()
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(paidAmount);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit({ bookingId, ...values });
  }

  return <AdvancedForm form={form} inputFields={renderedFields} onSubmit={onSubmit} submitButtonClassName="w-full" submittingPhrase={t("forms.cancelOrder")} isSubmitting={isSubmitting} />;
}
