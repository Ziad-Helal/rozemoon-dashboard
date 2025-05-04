import { LoadingSpinner } from "@/components";
import { Product_Form, UpdateProductDiscount_Form } from "@/components/forms";
import { ApplyDiscountToProduct, ChangeDiscountOfProduct, RemoveDiscountFromProduct, ToggleVisibility, UpdateItem } from "@/components/table-actions";
import { formatNumber, Language } from "@/localization";
import { useGetProductDetails, useRemoveDiscount, useToggleProductVisibility } from "@/queries";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props {
  id: number;
  discountId: number;
  discountPercentage: number;
  isHidden: boolean;
}

export default function Actions({ id, discountId, discountPercentage, isHidden }: Actions_Props) {
  const { i18n, t } = useTranslation();
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const { refetch, isFetching, data } = useGetProductDetails({ id });
  const { mutate: toggleVisibility, isPending: isTogglingVisibility } = useToggleProductVisibility();
  const { mutateAsync: removeDiscount, isPending: isRemovingDiscount } = useRemoveDiscount();

  useEffect(() => {
    if (updateIsOpen) refetch();
  }, [updateIsOpen]);

  return (
    <>
      <UpdateItem
        item="product"
        description={t("tableActions.updateItem.product") + formatNumber(i18n.language as Language, id, "decimal")}
        isOpen={updateIsOpen}
        setIsOpen={setUpdateIsOpen}
      >
        {isFetching ? <LoadingSpinner /> : <Product_Form product={data} onSuccess={() => setUpdateIsOpen(false)} />}
      </UpdateItem>
      <ToggleVisibility
        action={isHidden ? "unhide" : "hide"}
        item="product"
        onConfirm={() => toggleVisibility({ productId: id, isHidden: !isHidden })}
        isLoading={isTogglingVisibility}
        disabled={isRemovingDiscount}
      />
      {discountPercentage ? (
        <>
          <ChangeDiscountOfProduct id={id} disabled={isTogglingVisibility || isRemovingDiscount}>
            <UpdateProductDiscount_Form productId={id} discountId={discountId} />
          </ChangeDiscountOfProduct>
          <RemoveDiscountFromProduct
            productId={id}
            discountId={discountId}
            onConfirm={() => removeDiscount({ productId: id })}
            isLoading={isRemovingDiscount}
            disabled={isTogglingVisibility}
          />
        </>
      ) : (
        <ApplyDiscountToProduct id={id} disabled={isTogglingVisibility || isRemovingDiscount}>
          <UpdateProductDiscount_Form productId={id} />
        </ApplyDiscountToProduct>
      )}
    </>
  );
}
