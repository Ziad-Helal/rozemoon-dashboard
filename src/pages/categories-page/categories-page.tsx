import { FormsLinks_Page } from "@/components/layouts";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";

export default function Categories_Page() {
  const { t } = useTranslation();

  const forms = [{ label: t("forms.category.heading"), route: routes.createCategory }];

  return <FormsLinks_Page routes={forms} />;
}
