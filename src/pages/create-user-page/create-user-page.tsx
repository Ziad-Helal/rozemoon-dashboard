import { User_Form } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function CreateUser_Page() {
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.user.heading")}>
      <User_Form />
    </Form_Page>
  );
}
