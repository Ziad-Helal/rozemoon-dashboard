import { type FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useFormData } from "@/hooks/form";
import type { Service } from "@/types/api-types";

interface OrderService_Form_Props {
  service?: Service;
  onSubmit: (values: FormFields) => void;
}

export default function OrderService_Form({ service, onSubmit }: OrderService_Form_Props) {
  const data = useFormDataGetter(service);
  const { form, renderedFields } = useFormData({ ...data, shouldFocusError: false });

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmitSync={onSubmit}
      fieldsContainerClassName="grid gap-2 grid-cols-[2fr_1fr] space-y-0"
      actionsContainerClassName="hidden"
      submitOnBlur
    />
  );
}
