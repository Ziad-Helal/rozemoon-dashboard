import { LoadingSpinner } from "@/components";
import { Coupon_Form } from "@/components/forms";
import { ToggleActiveness, UpdateItem } from "@/components/table-actions";
import { formatNumber, Language } from "@/localization";
import { useGetCouponDetails, useToggleCouponActiveness } from "@/queries";
import { Coupon } from "@/types/api-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props extends Coupon {}

export default function Actions(coupon: Actions_Props) {
  const { i18n, t } = useTranslation();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { refetch, isFetching, data } = useGetCouponDetails({ id: coupon.id });
  const { mutate: toggleVisibility, isPending: isTogglingVisibility } = useToggleCouponActiveness();

  useEffect(() => {
    if (isUpdateOpen) refetch();
  }, [isUpdateOpen]);

  return (
    <>
      <UpdateItem
        item="coupon"
        description={t("tableActions.updateItem.coupon") + formatNumber(i18n.language as Language, coupon.id, "decimal")}
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
      >
        {isFetching ? <LoadingSpinner /> : <Coupon_Form coupon={data} onSuccess={() => setIsUpdateOpen(false)} />}
      </UpdateItem>
      <ToggleActiveness
        item="coupon"
        action={coupon.isActivated ? "deactivate" : "activate"}
        onConfirm={() => toggleVisibility(coupon)}
        isLoading={isTogglingVisibility}
        disabled={isTogglingVisibility}
      />
    </>
  );
}
