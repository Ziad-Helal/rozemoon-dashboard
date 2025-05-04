import { Notification_Form } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function CreateNotification_Page() {
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.notification.heading")}>
      <Notification_Form />
    </Form_Page>
  );
}
