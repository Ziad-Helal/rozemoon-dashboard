import { AdvancedForm } from "@/components/ui";
import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";

export default function SignIn_Form() {
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter();
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit(values);
  }

  return <AdvancedForm form={form} inputFields={renderedFields} onSubmit={onSubmit} isSubmitting={isSubmitting} />;
}
