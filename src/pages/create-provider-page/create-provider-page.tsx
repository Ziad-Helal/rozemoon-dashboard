import { Provider_Form } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function CreateProvider_Page() {
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.provider.heading")}>
      <Provider_Form />
    </Form_Page>
  );
}
