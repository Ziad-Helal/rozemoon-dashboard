import { Dialog, Image } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatDate, formatNumber, Language } from "@/localization";
import { ScheduledOrder } from "@/types/api-types";
import { ExpandIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProductPreparedQuantity_Badge, ScheduledOrderItem_Card } from "./components";
import { useState } from "react";
import { queryKeys, usePrepareScheduledOrder } from "@/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useEffectAfterMount } from "@/hooks/misc";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Expand_ScheduledOrder_Props {
  scheduledOrder: ScheduledOrder;
}

export default function Expand_ScheduledOrder({ scheduledOrder }: Expand_ScheduledOrder_Props) {
  const queryClient = useQueryClient();
  const { i18n, t } = useTranslation();
  const { id, bookingItems, status, priceBeforeDiscount, finalPrice, paidAmount, currency, deliveryAddress } = scheduledOrder;
  const priceDifference = priceBeforeDiscount - finalPrice;
  const [isOpen, setIsOpen] = useState(false);
  const [toBeAdded, setToBeAdded] = useState<{ productId: number; quantity: number }[]>([]);
  const [toBeReduced, setToBeReduced] = useState<{ productId: number; quantity: number }[]>([]);
  const { mutateAsync: prepareProducts, isPending: isPreparing } = usePrepareScheduledOrder();

  useEffectAfterMount(() => {
    if (!isOpen) {
      setToBeAdded([]);
      setToBeReduced([]);
    }
  }, [isOpen]);

  function updatePreparedQuantities() {
    if (toBeAdded.length)
      prepareProducts({ operation: "add", requestBody: { bookingId: id, preparedProducts: toBeAdded } })
        .then(async () => {
          if (toBeReduced.length) await prepareProducts({ operation: "reduce", requestBody: { bookingId: id, preparedProducts: toBeReduced } });
        })
        .then(() => queryClient.invalidateQueries({ queryKey: [queryKeys.storeScheduledOrders] }));
    else if (toBeReduced.length)
      prepareProducts({ operation: "reduce", requestBody: { bookingId: id, preparedProducts: toBeReduced } }).then(() =>
        queryClient.invalidateQueries({ queryKey: [queryKeys.storeScheduledOrders] })
      );
  }

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
      setIsOpen={setIsOpen}
    >
      <div className="space-y-2">
        {bookingItems.map((item) => (
          <ScheduledOrderItem_Card key={item.id} item={item} status={status} currency={currency} setToBeAdded={setToBeAdded} setToBeReduced={setToBeReduced} />
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
      {toBeAdded.length || toBeReduced.length ? (
        <div className="space-y-2 *:flex *:gap-2 *:flex-wrap">
          {toBeAdded.length ? (
            <p>
              {toBeAdded.map(({ productId, quantity }) => (
                <ProductPreparedQuantity_Badge
                  key={productId}
                  toBe="added"
                  id={productId}
                  quantitiy={bookingItems.find((item) => item.productId == productId)!.preparedQuantity}
                  quantitiyDifference={quantity}
                  setToBeAdded={setToBeAdded}
                  setToBeReduced={setToBeReduced}
                />
              ))}
            </p>
          ) : null}
          {toBeReduced.length ? (
            <p>
              {toBeReduced.map(({ productId, quantity }) => (
                <ProductPreparedQuantity_Badge
                  key={productId}
                  toBe="reduced"
                  id={productId}
                  quantitiy={bookingItems.find((item) => item.productId == productId)!.preparedQuantity}
                  quantitiyDifference={quantity}
                  setToBeAdded={setToBeAdded}
                  setToBeReduced={setToBeReduced}
                />
              ))}
            </p>
          ) : null}
          <Button className="w-full" onClick={updatePreparedQuantities} isLoading={isPreparing}>
            {t("forms.confirm")}
          </Button>
        </div>
      ) : null}
    </Dialog>
  );
}
