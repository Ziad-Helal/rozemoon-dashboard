import { LoadingSpinner } from "@/components";
import { Discount_Form } from "@/components/forms";
import { ToggleActiveness, UpdateItem } from "@/components/table-actions";
import { formatNumber, Language } from "@/localization";
import { useGetDiscountDetails, useToggleDiscountActiveness } from "@/queries";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props {
  id: number;
  isActive: boolean;
}

export default function Actions({ id, isActive }: Actions_Props) {
  const { i18n, t } = useTranslation();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { refetch, isFetching, data } = useGetDiscountDetails({ id });
  const { mutate: toggleVisibility, isPending: isTogglingVisibility } = useToggleDiscountActiveness();

  useEffect(() => {
    if (isUpdateOpen) refetch();
  }, [isUpdateOpen]);

  return (
    <>
      <UpdateItem
        item="discount"
        description={t("tableActions.updateItem.discount") + formatNumber(i18n.language as Language, id, "decimal")}
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
      >
        {isFetching ? <LoadingSpinner /> : <Discount_Form discount={data} onSuccess={() => setIsUpdateOpen(false)} />}
      </UpdateItem>
      <ToggleActiveness
        item="discount"
        action={isActive ? "deactivate" : "activate"}
        onConfirm={() => toggleVisibility({ id, isActive: !isActive })}
        isLoading={isTogglingVisibility}
        disabled={isTogglingVisibility}
      />
    </>
  );
}
