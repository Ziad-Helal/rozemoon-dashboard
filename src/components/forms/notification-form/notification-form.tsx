import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { InputField } from "@/types/form-types";
import { useEffect, useState } from "react";

export default function Notification_Form() {
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    inputFields,
    ...data
  } = useFormDataGetter();
  const [fields, setFields] = useState<InputField<FormFields>[]>(inputFields);
  const { form, renderedFields } = useFormData({ ...data, inputFields: fields, isSubmitting });

  const receiver = form.watch("receiver");
  useEffect(() => {
    setFields((prevFields) => receiverChangeHandler(prevFields));
  }, [receiver]);

  function receiverChangeHandler(fields: InputField<FormFields>[]) {
    const newFields = [...fields];
    return newFields.map((field) => {
      if (field.id == "receiverId" || field.id == "type") field.containerClassName += receiver == "User" ? " block" : " hidden";
      return field;
    });
  }

  function onSubmit(values: FormFields) {
    return submit({ ...values, type: values.type!, receiverId: values.receiverId || undefined });
  }

  return <AdvancedForm form={form} inputFields={renderedFields} onSubmit={onSubmit} isSubmitting={isSubmitting} resetFormButton />;
}
