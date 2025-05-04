import { useTranslation } from "react-i18next";
import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { AdvancedForm } from "@/components/ui";
import { Setting } from "@/types/api-types";

interface Setting_Form_Props {
  setting?: Setting;
  onSuccess?: VoidFunction;
}

export default function Setting_Form({ setting, onSuccess }: Setting_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(setting);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit(values).then((response) => {
      onSuccess?.();
      return response;
    });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      actionsContainerClassName={!!setting ? "[&>button]:w-full" : ""}
      submittingPhrase={setting ? t("forms.update") : t("forms.create")}
      resetFormButton={!!!setting}
    />
  );
}
