import { FormsLinks_Page } from "@/components/layouts";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";

export default function Coupons_Page() {
  const { t } = useTranslation();

  const forms = [{ label: t("forms.coupons.heading"), route: routes.createCoupon }];

  return <FormsLinks_Page routes={forms} />;
}
