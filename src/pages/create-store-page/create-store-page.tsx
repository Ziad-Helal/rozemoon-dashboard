import { Store_Form } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function CreateStore_Page() {
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.store.heading")}>
      <Store_Form />
    </Form_Page>
  );
}
