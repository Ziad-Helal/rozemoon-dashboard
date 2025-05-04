import { AdvancedForm } from "@/components/ui";
import { useFormData } from "@/hooks/form";
import { useTranslation } from "react-i18next";
import { FormFields, useFormDataGetter } from "./form-data";
import { UserStatus } from "@/types/api-types";

interface UpdateUserStatus_Form_Props {
  userId: number;
  status: UserStatus;
  onSuccess?: VoidFunction;
}

export default function UpdateUserStatus_Form({ userId, status, onSuccess }: UpdateUserStatus_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(status);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ userId, ...values }).then((response) => {
      onSuccess?.();
      return response;
    });
  }

  return (
    <AdvancedForm form={form} inputFields={renderedFields} onSubmit={onSubmit} isSubmitting={isSubmitting} submittingPhrase={t("forms.confirm")} submitButtonClassName="w-full" />
  );
}
