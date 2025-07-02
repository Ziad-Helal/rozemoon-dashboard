import { Image } from "@/components/misc";
import { formatCounts, formatNumber, handleDirectionChange, Language } from "@/localization";
import { cn } from "@/lib/utils";
import { ReturnInvoiceProduct_Form } from "@/components/forms";
import { useEffectAfterMount } from "@/hooks/misc";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { CreateReturnInvoiceItem, Currency, FastOrderItem, ScheduledOrderItem } from "@/types/api-types";
import type { FormFields } from "@/components/forms/return-invoice-product-form/form-data";

const baseUrl = import.meta.env.VITE_API_BASE_URL + "StaticFiles/Images/";

interface ReturnItem_Props {
  item: FastOrderItem | ScheduledOrderItem;
  currency: Currency;
  setInvoiceItems: Dispatch<SetStateAction<CreateReturnInvoiceItem[]>>;
}

export default function ReturnItem({ item, currency, setInvoiceItems }: ReturnItem_Props) {
  const { t, i18n } = useTranslation();
  const [productData, setProductData] = useState<FormFields>();
  const { productId, productName, productType, productImages, price, discountPercentage, quantity } = item;

  const discount = price * discountPercentage;
  const priceAfterDiscount = price - discount;
  const totalDiscount = discount * quantity;
  const totalPriceBeforeDiscount = price * quantity;
  const totalPriceAfterDiscount = priceAfterDiscount * quantity;

  useEffectAfterMount(() => {
    if (productData) updateInvoiceItems();
  }, [productData]);

  function updateInvoiceItems() {
    setInvoiceItems((prevItems) => {
      const items = [...prevItems];
      const itemIndex = prevItems.findIndex(({ productId }) => productId == productData!.productId);
      if (productData!.quantity > 0 && productData!.quantity <= quantity)
        if (itemIndex == -1) items.push(productData!);
        else items[itemIndex] = productData!;
      else if (itemIndex != -1) items.splice(itemIndex, 1);
      return items;
    });
  }

  return (
    <div className={cn("relative p-3 rounded-lg border border-foreground/50", productData && productData.quantity > 0 && productData.quantity <= quantity ? "" : "opacity-50")}>
      <p className={cn("text-muted-foreground text-end absolute top-2", handleDirectionChange(i18n.dir(), "right-3", "left-3"))}>
        #{formatNumber(i18n.language as Language, productId, "decimal")}
      </p>
      <div className="grid gap-2 grid-cols-[auto_1fr] mb-2">
        <Image src={baseUrl + productImages[0].imageUrl} containerProps={{ className: "size-12 lg:size-20 rounded" }} className="object-cover" />
        <div>
          <h3 className="lg:text-2xl">{productName}</h3>
          <p className="text-sm capitalize">
            <span>
              {formatCounts(
                i18n.language as Language,
                quantity,
                t(`keyWords.${productType.toLowerCase() as "stem" | "bunch"}`),
                t(`keyWords.${productType == "Stem" ? "stems" : "bunches"}`)
              )}{" "}
              *
            </span>{" "}
            <span className="text-muted-foreground">
              {totalDiscount ? (
                <>
                  -{formatNumber(i18n.language as Language, discountPercentage / 100, "percent")}{" "}
                  <span className="line-through">{formatNumber(i18n.language as Language, price, "decimal")}</span>{" "}
                </>
              ) : null}
              {formatNumber(i18n.language as Language, priceAfterDiscount, "currency", currency, "name")} / {t(`keyWords.${productType.toLowerCase() as "stem" | "bunch"}`)}
            </span>
          </p>
          <p className="capitalize">
            {t("pages.cart.totalCost")}:{" "}
            {totalDiscount ? (
              <>
                <span className="line-through text-muted-foreground">{formatNumber(i18n.language as Language, totalPriceBeforeDiscount, "decimal")}</span>{" "}
              </>
            ) : null}
            {formatNumber(i18n.language as Language, totalPriceAfterDiscount, "currency", currency, "name")}
          </p>
        </div>
      </div>
      <ReturnInvoiceProduct_Form productId={productId} maxQuantity={quantity} getValues={setProductData} isSubmitting={false} />
    </div>
  );
}
