import { Image } from "@/components/misc";
import { ReturnFeedback } from "../../components";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { formatCounts, formatNumber, handleDirectionChange, type Language } from "@/localization";
import type { ReturnedProduct } from "@/types/api-types";

interface ReturnedProduct_Card_Props {
  product: ReturnedProduct;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL + "StaticFiles/Images/";

export default function ReturnedProduct_Card({ product }: ReturnedProduct_Card_Props) {
  const { t, i18n } = useTranslation();
  const { productId, productName, productType, quantity, returnReason, returnImages } = product;

  return (
    <div className="relative border rounded-lg p-2">
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <Image src={baseUrl + "dd"} containerProps={{ className: "size-12 lg:size-20 rounded" }} className="object-cover" />
        <div>
          <p>{productName}</p>
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
        </div>
      </div>
      <ReturnFeedback reason={returnReason} returnImages={returnImages} className="mt-2" />
      <p className={cn("text-muted-foreground text-end absolute top-2", handleDirectionChange(i18n.dir(), "right-3", "left-3"))}>
        #{formatNumber(i18n.language as Language, productId, "decimal")}
      </p>
    </div>
  );
}
