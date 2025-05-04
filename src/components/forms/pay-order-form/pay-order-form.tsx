import { AdvancedForm } from "@/components/ui";
import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";

interface PayOrder_Form_Props {
  bookingId: number;
  maxAmount: number;
}

export default function PayOrder_Form({ bookingId, maxAmount }: PayOrder_Form_Props) {
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(maxAmount);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ bookingId, ...values });
  }

  return <AdvancedForm form={form} inputFields={renderedFields} onSubmit={onSubmit} isSubmitting={isSubmitting} actionsContainerClassName="[&>button]:w-full" />;
}
