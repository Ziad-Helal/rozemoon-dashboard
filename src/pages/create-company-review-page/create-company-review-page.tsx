import { CompanyReview_From } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { useTranslation } from "react-i18next";

export default function CreateCompanyReview_Page() {
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.companyReviews.heading")}>
      <CompanyReview_From />
    </Form_Page>
  );
}
