import { FormsLinks_Page } from "@/components/layouts";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";

export default function ProductsPage() {
  const { t } = useTranslation();

  const forms = [
    { label: t("forms.product.heading"), route: routes.createProduct },
    { label: t("forms.product.uploadHeading"), route: routes.uploadProducts },
  ];

  return <FormsLinks_Page routes={forms} />;
}
