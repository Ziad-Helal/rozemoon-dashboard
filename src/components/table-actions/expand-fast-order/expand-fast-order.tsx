import { Dialog, Image } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatDate, formatNumber, Language } from "@/localization";
import { FastOrder } from "@/types/api-types";
import { ExpandIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FastOrderItem_Card } from "./components";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Expand_FastOrder_Props {
  fastOrder: FastOrder;
}

export default function Expand_FastOrder({ fastOrder }: Expand_FastOrder_Props) {
  const { i18n, t } = useTranslation();
  const { id, deliveryAt, orderItems, currency, totalPriceBeforeDiscount, finalPrice, deliveryAddress } = fastOrder;
  const priceDifference = totalPriceBeforeDiscount - finalPrice;

  return (
    <Dialog
      title={`${t("keyWords.fast order")} #${formatNumber(i18n.language as Language, id, "decimal")}`}
      description={`${t("dataTable.deliveryAt")}: ${formatDate(i18n.language as Language, deliveryAt)}`}
      className="lg:max-w-screen-md"
      toolTip={t("tableActions.expandModal.tooltip.order")}
      trigger={
        <Button variant="ghost" size="icon" icon={ExpandIcon}>
          {t("tableActions.expandModal.tooltip.order")}
        </Button>
      }
    >
      <div className="space-y-2">
        {orderItems.map((item) => (
          <FastOrderItem_Card key={item.id} orderId={id} item={item} currency={currency} />
        ))}
      </div>
      <p className="capitalize lg:text-center">
        {t("tableActions.expandModal.total")}:{" "}
        {priceDifference > 0 ? (
          <>
            <span className="line-through text-muted-foreground">{formatNumber(i18n.language as Language, totalPriceBeforeDiscount, "decimal")}</span>{" "}
          </>
        ) : null}
        {formatNumber(i18n.language as Language, finalPrice, "currency", currency, "name")}
      </p>
      {typeof deliveryAddress != "string" && !!deliveryAddress?.pictureUrl && (
        <Image src={baseUrl + "StaticFiles/Docs/" + deliveryAddress.pictureUrl} containerProps={{ className: "aspect-square" }} />
      )}
    </Dialog>
  );
}
