import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { GetProductDetails_Response } from "@/types/api-types";
import { useTranslation } from "react-i18next";

export interface Product_Form_Props {
  product?: GetProductDetails_Response;
  onSuccess?: VoidFunction;
}

export default function Product_Form({ product, onSuccess }: Product_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(product);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  function onSubmit(values: FormFields) {
    return submit({
      ...values,
      productType: values.productType!,
      categoryId: values.categoryId!,
      colorId: values.colorId!,
      price_SAR: values.price_SAR!,
      price_USD: values.price_USD!,
      discountId: values.discountId || undefined,
      flowersPerStem: values.flowersPerStem!,
      stemPerBunch: values.stemPerBunch!,
      stemSizePerCM: values.stemSizePerCM!,
      vaseLifePerDay: values.vaseLifePerDay!,
      id: product?.id || 0,
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
      submittingPhrase={product ? t("forms.update") : t("forms.create")}
      isSubmitting={isSubmitting}
      fieldsContainerClassName="space-y-0 grid gap-3 grid-cols-1 lg:grid-cols-2"
      submitButtonClassName={product ? "w-full" : undefined}
      resetFormButton={!!!product}
    />
  );
}
