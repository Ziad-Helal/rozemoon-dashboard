import { ProductPreparedQuantity_Form } from "@/components/forms";
import { Image } from "@/components/misc";
import { useQuerySubscribe } from "@/hooks/misc";
import { cn } from "@/lib/utils";
import { formatCounts, formatNumber, handleDirectionChange, Language } from "@/localization";
import { queryKeys } from "@/queries";
import { AuthenticatedUser, Currency, ScheduledOrderItem, ScheduledOrderStatus } from "@/types/api-types";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface ScheduledOrderItem_Card_Props {
  item: ScheduledOrderItem;
  status: ScheduledOrderStatus;
  currency: Currency;
  setToBeAdded: Dispatch<SetStateAction<{ productId: number; quantity: number }[]>>;
  setToBeReduced: Dispatch<SetStateAction<{ productId: number; quantity: number }[]>>;
}

export default function ScheduledOrderItem_Card({ item, status, currency, setToBeAdded, setToBeReduced }: ScheduledOrderItem_Card_Props) {
  const { i18n, t } = useTranslation();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { productId, productName, quantity, preparedQuantity, productType, productImages, discountPercentage, price } = item;
  const quantityDifference = quantity - preparedQuantity;
  const newPrice = price - (price * (discountPercentage || 0)) / 100;
  const totalPrice = newPrice * quantity;
  const totalDiscount = price * quantity - totalPrice;

  return (
    <div className="p-2 border rounded-xl relative">
      <div className="grid gap-2 grid-cols-[auto_1fr]">
        <Image src={baseUrl + "StaticFiles/Images/" + productImages[0].imageUrl} containerProps={{ className: "size-12 lg:size-20 rounded" }} className="object-cover" />
        <div>
          <div>
            <p>{productName}</p>
            <p className={cn("capitalize", quantityDifference == 0 ? "text-green-700" : "text-destructive")}>
              {formatNumber(i18n.language as Language, preparedQuantity, "decimal")} / {formatNumber(i18n.language as Language, quantity, "decimal")}{" "}
              {formatCounts(
                i18n.language as Language,
                quantity,
                productType == "Stem" ? t("keyWords.stem") : t("keyWords.bunch"),
                productType == "Stem" ? t("keyWords.stems") : t("keyWords.bunches"),
                true
              )}
            </p>
          </div>
          <p className={cn("text-muted-foreground text-end absolute top-1", handleDirectionChange(i18n.dir(), "right-2", "left-2"))}>
            #{formatNumber(i18n.language as Language, productId, "decimal")}
          </p>
          <p className="text-muted-foreground text-sm capitalize">
            {discountPercentage ? (
              <>
                -{formatNumber(i18n.language as Language, discountPercentage / 100, "percent")}{" "}
                <span className="line-through">{formatNumber(i18n.language as Language, price, "decimal")}</span>{" "}
              </>
            ) : null}
            {/* {formatNumber(i18n.language as Language, newPrice, "currency", currency)} / {t(`keyWords.${productType.toLowerCase() as "stem" | "bunch"}`)} */}
          </p>
          <p className="capitalize">
            {t("keyWords.total")}:{" "}
            {discountPercentage ? (
              <>
                <span className="line-through text-muted-foreground">{formatNumber(i18n.language as Language, totalPrice + totalDiscount, "decimal")}</span>{" "}
              </>
            ) : null}
            {formatNumber(i18n.language as Language, totalPrice, "currency", currency, "name")}
          </p>
        </div>
      </div>
      {user?.roles[0] == "StoreKeeper" && (status == "AssignedToBranch" || status == "FullyPrepared" || status == "HasIssue" || status == "IssueReported") && (
        <ProductPreparedQuantity_Form productId={productId} quantity={preparedQuantity} setToBeAdded={setToBeAdded} setToBeReduced={setToBeReduced} />
      )}
    </div>
  );
}
