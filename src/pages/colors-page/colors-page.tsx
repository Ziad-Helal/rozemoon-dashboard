import { FormsLinks_Page } from "@/components/layouts";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";

export default function ColorsPage() {
  const { t } = useTranslation();

  const forms = [{ label: t("forms.color.heading"), route: routes.createColor }];

  return <FormsLinks_Page routes={forms} />;
}
