import { AdvancedForm } from "@/components/ui";
import { FormFields, useFormDataGetter } from "./form-data";
import { useFormData } from "@/hooks/form";
import { UpdateCompanyReview_Request } from "@/types/api-types";
import { useTranslation } from "react-i18next";

interface CompanyReview_From_Props {
  review?: UpdateCompanyReview_Request;
}

export default function CompanyReview_From({ review }: CompanyReview_From_Props) {
  const { t } = useTranslation();
  const {
    mutation: { mutateAsync: submit, isPending: isSubmitting },
    ...data
  } = useFormDataGetter(review);
  const { form, renderedFields } = useFormData({ ...data, isSubmitting });

  async function onSubmit(values: FormFields) {
    return submit({ id: review?.id || 0, ...values });
  }

  return (
    <AdvancedForm
      form={form}
      inputFields={renderedFields}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      actionsContainerClassName="[&>button]:w-full"
      submittingPhrase={review ? t("forms.update") : t("forms.create")}
      resetFormButton={!!!review}
    />
  );
}
