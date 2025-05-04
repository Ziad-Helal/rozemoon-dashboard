import { FormsLinks_Page } from "@/components/layouts";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";

export default function Reviews_Page() {
  const { t } = useTranslation();

  const forms = [{ label: t("forms.companyReviews.heading"), route: routes.createCompanyReview }];

  return <FormsLinks_Page routes={forms} />;
}
