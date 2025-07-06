import { useFormData } from "@/hooks/form";
import { AdvancedForm } from "@/components/ui";
import { type FormFields, useFormDataGetter } from "./form-data";
import type { CreateGuestUser_Request } from "@/types/api-types";

interface GuestUser_Form_Props {
  user?: Omit<CreateGuestUser_Request, "customerId">;
  onSubmit: (values: FormFields) => void;
}

export default function GuestUser_Form({ user, onSubmit }: GuestUser_Form_Props) {
  const data = useFormDataGetter(user);
  const { form, renderedFields } = useFormData(data);

  return <AdvancedForm form={form} inputFields={renderedFields} onSubmitSync={onSubmit} actionsContainerClassName="[&>button]:w-full" />;
}
