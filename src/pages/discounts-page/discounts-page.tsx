import { FormsLinks_Page } from "@/components/layouts";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";

export default function Discounts_Page() {
  const { t } = useTranslation();

  const forms = [{ label: t("forms.discount.heading"), route: routes.createDiscount }];

  return <FormsLinks_Page routes={forms} />;
}
