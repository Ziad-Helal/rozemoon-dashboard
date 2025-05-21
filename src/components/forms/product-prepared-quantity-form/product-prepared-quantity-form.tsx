import { useFormData } from "@/hooks/form";
import { FormFields, useFormDataGetter } from "./form-data";
import { AdvancedForm } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";
import { clearFromState, modifyInState } from "@/lib/utils";

interface ProductPreparedQuantity_Form_Props {
  productId: number;
  quantity: number;
  setToBeAdded: Dispatch<SetStateAction<{ productId: number; quantity: number }[]>>;
  setToBeReduced: Dispatch<SetStateAction<{ productId: number; quantity: number }[]>>;
}

export default function ProductPreparedQuantity_Form({ productId, quantity, setToBeAdded, setToBeReduced }: ProductPreparedQuantity_Form_Props) {
  const { t } = useTranslation();
  const data = useFormDataGetter(quantity);
  const { form, renderedFields } = useFormData(data);

  function onSubmit(values: FormFields) {
    if (values.quantity == null || values.quantity == 0) {
      setToBeAdded((prevState) => clearFromState([...prevState], "productId", productId));
      setToBeReduced((prevState) => clearFromState([...prevState], "productId", productId));
    }
    if (values.quantity! > 0) {
      setToBeReduced((prevState) => clearFromState([...prevState], "productId", productId));
      setToBeAdded((prevState) => modifyInState([...prevState], "productId", productId, "quantity", values.quantity!));
    } else if (values.quantity! < 0) {
      setToBeAdded((prevState) => clearFromState([...prevState], "productId", productId));
      setToBeReduced((prevState) => modifyInState([...prevState], "productId", productId, "quantity", Math.abs(values.quantity!)));
    }
    // return submit({ requestBody: { bookingId, preparedProducts: [{ productId, quantity: Math.abs(values.quantity!) }] }, operation: values.quantity! > 0 ? "add" : "reduce" });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmitSync={onSubmit}
      className="mt-2 flex gap-1 items-start"
      fieldsContainerClassName="flex-1"
      actionsContainerClassName="mt-0 [&>button]:h-9"
      submittingPhrase={t("forms.prepare")}
    />
  );
}
