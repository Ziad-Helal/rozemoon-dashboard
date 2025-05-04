import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";

interface UpdateProductDiscount_Form_Props {
  productId: number;
  discountId?: number;
}

export default function UpdateProductDiscount_Form({ productId, discountId }: UpdateProductDiscount_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(discountId);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ productId, discountId: values.discountId! });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      actionsContainerClassName="[&>button]:w-full"
      submittingPhrase={discountId ? t("forms.change") : t("forms.apply")}
    />
  );
}
