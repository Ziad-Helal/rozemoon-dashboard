import { useTranslation } from "react-i18next";
import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { AdvancedForm } from "@/components/ui";

interface ChangePassword_Form_Props {
  onSuccess?: VoidFunction;
}

export default function ChangePassword_Form({ onSuccess }: ChangePassword_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter();
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit(values).then((response) => {
      onSuccess?.();
      return response;
    });
  }

  return (
    <AdvancedForm form={form} inputFields={renderedFields} onSubmit={onSubmit} submittingPhrase={t("forms.update")} isSubmitting={isSubmitting} submitButtonClassName="w-full" />
  );
}
