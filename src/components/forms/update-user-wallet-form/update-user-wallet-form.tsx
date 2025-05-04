import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";

interface UpdateUserWallet_Form_Props {
  customerId: number;
  email: string;
  onSuccess?: VoidFunction;
}

export default function UpdateUserWallet_Form({ customerId, email, onSuccess }: UpdateUserWallet_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter();
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ customerId, email, ...values, amount: values.amount! }).then((response) => {
      onSuccess?.();
      return response;
    });
  }

  return (
    <AdvancedForm form={form} inputFields={renderedFields} onSubmit={onSubmit} isSubmitting={isSubmitting} submittingPhrase={t("forms.confirm")} submitButtonClassName="w-full" />
  );
}
