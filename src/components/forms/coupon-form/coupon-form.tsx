import { useTranslation } from "react-i18next";
import { type FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { AdvancedForm } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Coupon_Form_Props {
  coupon?: any;
  onSuccess?: VoidFunction;
}

export default function Coupon_Form({ coupon, onSuccess }: Coupon_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(coupon);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({
      id: coupon?.id || 0,
      ...values,
      maxAmountSar: values.maxAmountSar || undefined,
      maxAmountUsd: values.maxAmountUsd || undefined,
      maxNumOfRedeemsPerUser: values.maxNumOfRedeemsPerUser || undefined,
      maxRedeems: values.maxRedeems || undefined,
    }).then((response) => {
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
      fieldsContainerClassName="space-y-0 grid gap-3 grid-cols-1 lg:grid-cols-2"
      actionsContainerClassName={cn(!coupon ? "" : "[&>button]:w-full")}
      submittingPhrase={coupon ? t("forms.update") : t("forms.create")}
      resetFormButton={!coupon}
    />
  );
}
