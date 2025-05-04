import { CompanyReview_From } from "@/components/forms";
import { ToggleVisibility, UpdateItem } from "@/components/table-actions";
import { formatNumber, Language } from "@/localization";
import { useToggleCompanyReviewVisibility } from "@/queries";
import { UpdateCompanyReview_Request } from "@/types/api-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props extends UpdateCompanyReview_Request {}

export default function Actions(review: Actions_Props) {
  const { id, isHidden } = review;
  const { i18n, t } = useTranslation();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { mutate: toggleVisibility, isPending: isTogglingVisibility } = useToggleCompanyReviewVisibility();

  return (
    <>
      <UpdateItem
        item="review"
        description={t("tableActions.updateItem.review") + formatNumber(i18n.language as Language, id, "decimal")}
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        disabled={isTogglingVisibility}
      >
        <CompanyReview_From review={review} />
      </UpdateItem>
      <ToggleVisibility
        item="review"
        action={isHidden ? "unhide" : "hide"}
        onConfirm={() => toggleVisibility({ id, isHidden: !isHidden })}
        isLoading={isTogglingVisibility}
        disabled={isTogglingVisibility}
      />
    </>
  );
}
