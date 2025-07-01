import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { AdvancedForm } from "@/components/ui";

interface ReturnInvoice_Form_Props {
  orderId: string;
  isSubmitting: boolean;
  getValues: (values: FormFields) => void;
}

export default function ReturnInvoice_Form({ orderId, isSubmitting, getValues }: ReturnInvoice_Form_Props) {
  const data = useFormDataGetter(orderId);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function submit(values: FormFields) {
    getValues(values);
  }

  return <AdvancedForm form={form} onSubmitSync={submit} inputFields={renderedFields} isSubmitting={isSubmitting} submitOnChange />;
}
