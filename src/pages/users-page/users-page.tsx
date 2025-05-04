import { FormsLinks_Page } from "@/components/layouts";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";

export default function Users_Page() {
  const { t } = useTranslation();

  const forms = [{ label: t("forms.user.heading"), route: routes.createUser }];

  return <FormsLinks_Page routes={forms} />;
}
