import { Avatar, AvatarFallback } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatCounts, formatNumber, handleDirectionChange, Language } from "@/localization";
import { Currency, StockRefillItem } from "@/types/api-types";
import { useTranslation } from "react-i18next";

interface StockRefillItem_Card_Props {
  item: StockRefillItem;
  currency: Currency;
}

export default function StockRefillItem_Card({ item, currency }: StockRefillItem_Card_Props) {
  const { i18n, t } = useTranslation();
  const { productId, name, productType, purchasePrice, quantity } = item;

  return (
    <div className="p-2 border rounded-xl relative">
      <div className="grid gap-2 grid-cols-[3.5rem_1fr]">
        <Avatar className="rounded-lg size-14">
          <AvatarFallback className="rounded-lg">{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p>{name}</p>
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
            {formatNumber(i18n.language as Language, purchasePrice, "currency", currency)} / {t(`keyWords.${productType.toLowerCase() as "stem" | "bunch"}`)}
          </p>
          <p className="capitalize">
            {t("keyWords.total")}: {formatNumber(i18n.language as Language, purchasePrice * quantity, "currency", currency, "name")}
          </p>
        </div>
      </div>
      <p className={cn("text-muted-foreground text-end absolute top-1", handleDirectionChange(i18n.dir(), "right-2", "left-2"))}>
        #{formatNumber(i18n.language as Language, productId, "decimal")}
      </p>
    </div>
  );
}
