import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { GetStoreDetails_Response } from "@/types/api-types";

export interface Store_Form_Props {
  store?: GetStoreDetails_Response;
  onSuccess?: VoidFunction;
}

export default function Store_Form({ store, onSuccess }: Store_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(store);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit({ ...values, currency: values.currency!, id: store?.id || 0 }).then((response) => {
      onSuccess?.();
      return response;
    });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      submittingPhrase={store ? t("forms.update") : t("forms.create")}
      isSubmitting={isSubmitting}
      fieldsContainerClassName="space-y-0 grid gap-3 grid-cols-1 lg:grid-cols-2"
      submitButtonClassName={store ? "w-full" : undefined}
      resetFormButton={!!!store}
    />
  );
}
