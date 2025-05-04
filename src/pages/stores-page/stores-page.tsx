import { FormsLinks_Page } from "@/components/layouts";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";

export default function Stores_Page() {
  const { t } = useTranslation();

  const forms = [{ label: t("forms.store.heading"), route: routes.createStore }];

  return <FormsLinks_Page routes={forms} />;
}
