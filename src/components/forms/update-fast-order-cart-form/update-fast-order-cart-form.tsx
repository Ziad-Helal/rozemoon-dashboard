import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { StockProduct } from "@/types/api-types";
import { expandCartProduct } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface UpdateFastOrderCart_Form_Props {
  defaultValues: FormFields;
  product: StockProduct;
  onSuccess?: VoidFunction;
}

export default function UpdateFastOrderCart_Form({ defaultValues, product, onSuccess }: UpdateFastOrderCart_Form_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(product.quantity, defaultValues);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit(expandCartProduct(product, values.cartQuantity)).then((response) => {
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
      submittingPhrase={defaultValues.cartQuantity ? t("forms.update") : t("forms.add")}
      submitButtonClassName="w-full"
    />
  );
}
