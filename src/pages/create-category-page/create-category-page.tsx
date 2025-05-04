import { Category_Form } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function CreateCategory_Page() {
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.category.heading")}>
      <Category_Form />
    </Form_Page>
  );
}
