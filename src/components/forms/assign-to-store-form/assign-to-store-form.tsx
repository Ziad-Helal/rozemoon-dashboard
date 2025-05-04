import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";

export interface AssignToStore_Form_Props {
  bookingId: number;
}

export default function AssignToStore_Form({ bookingId }: AssignToStore_Form_Props) {
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter();
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit({ bookingId, branchId: values.branchId! });
  }

  return <AdvancedForm form={form} inputFields={renderedFields} onSubmit={onSubmit} submitButtonClassName="w-full" isSubmitting={isSubmitting} />;
}
