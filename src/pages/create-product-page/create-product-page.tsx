import { Product_Form } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function CreateProduct_Page() {
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.product.heading")}>
      <Product_Form />
    </Form_Page>
  );
}
