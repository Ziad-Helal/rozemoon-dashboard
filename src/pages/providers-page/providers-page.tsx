import { FormsLinks_Page } from "@/components/layouts";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";

export default function Providers_Page() {
  const { t } = useTranslation();

  const forms = [{ label: t("forms.provider.heading"), route: routes.createProvider }];

  return <FormsLinks_Page routes={forms} />;
}
