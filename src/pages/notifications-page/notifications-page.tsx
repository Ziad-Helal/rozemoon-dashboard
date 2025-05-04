import { FormsLinks_Page } from "@/components/layouts";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";

export default function Notifications_Page() {
  const { t } = useTranslation();

  const forms = [{ label: t("forms.notification.heading"), route: routes.createNotification }];

  return <FormsLinks_Page routes={forms} />;
}
