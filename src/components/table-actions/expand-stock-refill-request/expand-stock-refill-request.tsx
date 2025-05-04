import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatDate, formatNumber, Language } from "@/localization";
import { ExpandIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StockRefillItem_Card } from "./components";
import { StockRefill } from "@/types/api-types";

interface ExpandStockRefillRequest_Props {
  order: StockRefill;
}

export default function ExpandStockRefillRequest({ order }: ExpandStockRefillRequest_Props) {
  const { i18n, t } = useTranslation();
  const { id, refillItems, providerId, createdAt, currency, finalPrice } = order;

  return (
    <Dialog
      title={`${t("keyWords.stockRefillRequest")} #${formatNumber(i18n.language as Language, id, "decimal")}`}
      description={`${t("dataTable.createdAt")} ${formatDate(i18n.language as Language, createdAt)} - ${t("keyWords.provider")} #${formatNumber(
        i18n.language as Language,
        providerId,
        "decimal"
      )}`}
      toolTip={t("tableActions.expandModal.tooltip.order")}
      trigger={
        <Button variant="ghost" size="icon" icon={ExpandIcon}>
          {t("tableActions.expandModal.tooltip.order")}
        </Button>
      }
    >
      <div className="space-y-2">
        {refillItems.map((item) => (
          <StockRefillItem_Card key={item.id} item={item} currency={currency} />
        ))}
      </div>
      <p className="capitalize text-center">
        {t("tableActions.expandModal.total")}: {formatNumber(i18n.language as Language, finalPrice, "currency", currency, "name")}
      </p>
    </Dialog>
  );
}
