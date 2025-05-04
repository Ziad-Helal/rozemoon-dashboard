import { Setting_Form } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function CreateSetting_Page() {
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.setting.heading")}>
      <Setting_Form />
    </Form_Page>
  );
}
