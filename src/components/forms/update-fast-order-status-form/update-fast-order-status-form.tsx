import { FastOrderStatus } from "@/types/api-types";
import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";

interface UpdateFastOrderStatus_Form_Props {
  orderId: number;
  status: FastOrderStatus;
}

export default function UpdateFastOrderStatus_Form({ orderId, status }: UpdateFastOrderStatus_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(status);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit({ orderId, ...values });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      actionsContainerClassName="[&>button]:w-full"
      submittingPhrase={t("forms.update")}
    />
  );
}
