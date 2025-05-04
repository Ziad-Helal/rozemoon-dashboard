import { Discount_Form } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function CreateDiscount_Page() {
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.discount.heading")}>
      <Discount_Form />
    </Form_Page>
  );
}
