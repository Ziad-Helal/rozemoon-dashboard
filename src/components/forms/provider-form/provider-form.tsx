import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { UpdateProvider_Request } from "@/types/api-types";
import { useTranslation } from "react-i18next";

interface Provider_Form_Props {
  provider?: UpdateProvider_Request;
}

export default function Provider_Form({ provider }: Provider_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(provider);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ id: provider?.id || 0, ...values });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      actionsContainerClassName="[&>button]:w-full"
      submittingPhrase={provider ? t("forms.update") : t("forms.create")}
      resetFormButton={!!!provider}
    />
  );
}
