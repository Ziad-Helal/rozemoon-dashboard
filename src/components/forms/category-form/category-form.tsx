import { AdvancedForm } from "@/components/ui";
import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { UpdateCategory_Request } from "@/types/api-types";
import { useTranslation } from "react-i18next";

export interface Category_Form_Props {
  category?: UpdateCategory_Request;
  onSuccess?: VoidFunction;
}

export default function Category_Form({ category, onSuccess }: Category_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(category);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit({ id: category?.id || 0, ...values }).then((response) => {
      onSuccess?.();
      return response;
    });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      submittingPhrase={category ? t("forms.update") : t("forms.create")}
      isSubmitting={isSubmitting}
      fieldsContainerClassName="space-y-0 grid gap-3 grid-cols-1 lg:grid-cols-2"
      submitButtonClassName={category ? "w-full" : undefined}
      resetFormButton={!!!category}
    />
  );
}
