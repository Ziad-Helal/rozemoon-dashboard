import { Form_Page, CreateDamageInvoice } from "@/components/layouts";
import { queryKeys } from "@/queries";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { mergeTypes } from "zod";
import type { FastOrder, GetFastOrders_Response, GetScheduledOrders_Response, ScheduledOrder } from "@/types/api-types";

export default function CreateDamageInvoice_Page() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isScheduledOrder = pathname.split("/").includes("scheduled");
  const damageCart = true;
  const orderId = +useSearchParams()[0].get("id")!;
  const order = queryClient
    .getQueryData<mergeTypes<GetFastOrders_Response, GetScheduledOrders_Response>>([queryKeys[isScheduledOrder ? "storeScheduledOrders" : "myFastOrders"]])
    ?.items.find(({ id }) => id == orderId) as mergeTypes<FastOrder, ScheduledOrder> | undefined;

  return (
    <Form_Page heading={t("forms.damageInvoice.heading")}>
      {order ? (
        <CreateDamageInvoice orderId={orderId} isScheduledOrder={isScheduledOrder} order={order} />
      ) : damageCart ? (
        <p>damage cart</p>
      ) : (
        <p className="text-center text-muted-foreground">{t("pages.damageInvoice.wrongSource")}</p>
      )}
    </Form_Page>
  );
}
