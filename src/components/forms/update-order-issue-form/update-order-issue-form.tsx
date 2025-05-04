import { UpdateOrderIssue_Request } from "@/types/api-types";
import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";

interface UpdateOrderIssue_Form_Props extends Omit<UpdateOrderIssue_Request, "adminNote"> {
  onSuccess?: VoidFunction;
}

export default function UpdateOrderIssue_Form({ issueId, status, onSuccess }: UpdateOrderIssue_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(status);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ issueId, ...values }).then((response) => {
      onSuccess?.();
      return response;
    });
  }

  return (
    <AdvancedForm form={form} inputFields={renderedFields} onSubmit={onSubmit} isSubmitting={isSubmitting} submittingPhrase={t("forms.update")} submitButtonClassName="w-full" />
  );
}
