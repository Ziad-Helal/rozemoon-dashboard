import { Dialog, Image } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatDate, formatNumber, Language } from "@/localization";
import { ScheduledOrder } from "@/types/api-types";
import { ExpandIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScheduledOrderItem_Card } from "./components";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Expand_ScheduledOrder_Props {
  scheduledOrder: ScheduledOrder;
}

export default function Expand_ScheduledOrder({ scheduledOrder }: Expand_ScheduledOrder_Props) {
  const { i18n, t } = useTranslation();
  const { id, bookingItems, status, priceBeforeDiscount, finalPrice, paidAmount, currency, deliveryAddress } = scheduledOrder;
  const priceDifference = priceBeforeDiscount - finalPrice;

  return (
    <Dialog
      title={`${t("keyWords.scheduledOrder")} #${formatNumber(i18n.language as Language, id, "decimal")}`}
      description={`${t("dataTable.deliveryAt")}: ${formatDate(i18n.language as Language, scheduledOrder.deliveryAt)}`}
      className="lg:max-w-screen-md"
      toolTip={t("tableActions.expandModal.tooltip.order")}
      trigger={
        <Button variant="ghost" size="icon" icon={ExpandIcon}>
          {t("tableActions.expandModal.tooltip.order")}
        </Button>
      }
    >
      <div className="space-y-2">
        {bookingItems.map((item) => (
          <ScheduledOrderItem_Card key={item.id} orderId={scheduledOrder.id} item={item} status={status} currency={currency} />
        ))}
      </div>
      <p className="capitalize lg:text-center">
        {t("tableActions.expandModal.total")}:{" "}
        {priceDifference > 0 ? (
          <>
            <span className="line-through text-muted-foreground">{formatNumber(i18n.language as Language, priceBeforeDiscount, "decimal")}</span>{" "}
          </>
        ) : null}
        {formatNumber(i18n.language as Language, paidAmount, "decimal")} / {formatNumber(i18n.language as Language, finalPrice, "currency", currency, "name")}
      </p>
      {typeof deliveryAddress != "string" && !!deliveryAddress?.pictureUrl && <Image src={baseUrl + deliveryAddress.pictureUrl} containerProps={{ className: "aspect-square" }} />}
    </Dialog>
  );
}
