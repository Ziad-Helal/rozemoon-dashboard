import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { AdvancedForm } from "@/components/ui";

interface DamageInvoiceProduct_Form_Props {
  productId: number;
  maxQuantity: number;
  isSubmitting: boolean;
  getValues: (values: FormFields) => void;
  defauleValues?: FormFields;
}

export default function DamageInvoiceProduct_Form({ productId, maxQuantity, isSubmitting, getValues, defauleValues }: DamageInvoiceProduct_Form_Props) {
  const data = useFormDataGetter(productId, maxQuantity, defauleValues);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  return <AdvancedForm form={form} onSubmitSync={getValues} inputFields={renderedFields} actionsContainerClassName="hidden" isSubmitting={isSubmitting} submitOnChange />;
}
