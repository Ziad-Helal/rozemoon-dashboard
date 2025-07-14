import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { AdvancedForm } from "@/components/ui";

interface DamageInvoice_Form_Props {
  orderId?: string;
  isSubmitting: boolean;
  getValues: (values: FormFields) => void;
}

export default function DamageInvoice_Form({ orderId, isSubmitting, getValues }: DamageInvoice_Form_Props) {
  const data = useFormDataGetter(orderId);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  return <AdvancedForm form={form} onSubmitSync={getValues} inputFields={renderedFields} actionsContainerClassName="hidden" isSubmitting={isSubmitting} submitOnChange />;
}
