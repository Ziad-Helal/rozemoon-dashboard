import { AdvancedForm } from "@/components/ui";
import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { UpdateColor_Request } from "@/types/api-types";
import { useTranslation } from "react-i18next";

export interface Color_Form_Props {
  color?: UpdateColor_Request;
  onSuccess?: VoidFunction;
}

export default function Color_Form({ color, onSuccess }: Color_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(color);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit({ id: color?.id || 0, ...values }).then((response) => {
      onSuccess?.();
      return response;
    });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      submittingPhrase={color ? t("forms.update") : t("forms.create")}
      isSubmitting={isSubmitting}
      fieldsContainerClassName="space-y-0 grid gap-3 grid-cols-1 lg:grid-cols-2"
      submitButtonClassName={color ? "w-full" : undefined}
      resetFormButton={!!!color}
    />
  );
}
