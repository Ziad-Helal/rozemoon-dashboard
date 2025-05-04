import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useEffect, useState } from "react";
import { InputField } from "@/types/form-types";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys } from "@/queries";
import { AuthenticatedUser } from "@/types/api-types";

export default function User_Form() {
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    inputFields,
    ...data
  } = useFormDataGetter();
  const [fields, setFields] = useState<InputField<FormFields>[]>(inputFields);
  const { form, renderedFields } = useFormData({ ...data, inputFields: fields, isSubmitting });

  const receiver = form.watch("role");
  useEffect(() => {
    setFields((prevFields) => receiverChangeHandler(prevFields));
  }, [receiver]);

  function receiverChangeHandler(fields: InputField<FormFields>[]) {
    const newFields = [...fields];
    return newFields.map((field) => {
      if (field.id == "branchId") field.containerClassName += user?.roles[0] != "Admin" || !receiver?.length || receiver == "Admin" ? " hidden" : " block";
      return field;
    });
  }

  function onSubmit(values: FormFields) {
    return submit({ ...values, role: values.role!, branchId: values.branchId || undefined });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      fieldsContainerClassName="space-y-0 grid gap-3 grid-cols-1 lg:grid-cols-2"
      resetFormButton
    />
  );
}
