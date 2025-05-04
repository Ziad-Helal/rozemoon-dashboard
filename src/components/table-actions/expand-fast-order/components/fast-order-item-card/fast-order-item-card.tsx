import { ProductReturn_Form } from "@/components/forms";
import { Image } from "@/components/misc";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { useQuerySubscribe } from "@/hooks/misc";
import { cn } from "@/lib/utils";
import { formatCounts, formatNumber, handleDirectionChange, Language } from "@/localization";
import { queryKeys } from "@/queries";
import { AuthenticatedUser, Currency, FastOrderItem } from "@/types/api-types";
import { useTranslation } from "react-i18next";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface FastOrderItem_Card_Props {
  orderId: number;
  item: FastOrderItem;
  currency: Currency;
}

export default function FastOrderItem_Card({ orderId, item, currency }: FastOrderItem_Card_Props) {
  const { i18n, t } = useTranslation();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { productId, productName, productImages, discountPercentage, quantity, price, productType } = item;
  const newPrice = price - (price * (discountPercentage || 0)) / 100;
  const totalPrice = newPrice * quantity;
  const totalDiscount = price * quantity - totalPrice;

  return (
    <div className="relative p-2 rounded-xl border grid">
      <p className={cn("text-muted-foreground text-end absolute top-2", handleDirectionChange(i18n.dir(), "right-3", "left-3"))}>
        #{formatNumber(i18n.language as Language, productId, "decimal")}
      </p>
      <div className="grid gap-2 grid-cols-[auto_1fr]">
        <Image src={baseUrl + "StaticFiles/Images/" + productImages[0].imageUrl} containerProps={{ className: "size-12 lg:size-20 rounded" }} className="object-cover" />
        <div>
          <h3 className="lg:text-2xl">{productName}</h3>
          <p className="capitalize">
            {formatNumber(i18n.language as Language, quantity, "decimal")}{" "}
            {formatCounts(
              i18n.language as Language,
              quantity,
              productType == "Stem" ? t("keyWords.stem") : t("keyWords.bunch"),
              productType == "Stem" ? t("keyWords.stems") : t("keyWords.bunches"),
              true
            )}
          </p>
          <p className="text-muted-foreground text-sm capitalize">
            {discountPercentage ? (
              <>
                -{formatNumber(i18n.language as Language, discountPercentage / 100, "percent")}{" "}
                <span className="line-through">{formatNumber(i18n.language as Language, price, "decimal")}</span>{" "}
              </>
            ) : null}
            {formatNumber(i18n.language as Language, newPrice, "currency", currency)} / {t(`keyWords.${productType.toLowerCase() as "stem" | "bunch"}`)}
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
      {user?.roles[0] == "Cashier" && (
        <Accordion type="single" collapsible>
          <AccordionItem value="return" className="border-none">
            <AccordionTrigger className="py-0 flex-row-reverse justify-start gap-1 w-fit">Return</AccordionTrigger>
            <AccordionContent className="pb-0 p-0.5">
              <ProductReturn_Form orderId={orderId} productId={productId} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
