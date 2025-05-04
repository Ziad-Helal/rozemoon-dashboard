import { Color_Form } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function CreateColor_Page() {
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.color.heading")}>
      <Color_Form />
    </Form_Page>
  );
}
