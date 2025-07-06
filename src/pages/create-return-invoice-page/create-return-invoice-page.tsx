import { Form_Page, CreateReturnInvoice } from "@/components/layouts";
import { queryKeys } from "@/queries";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { GetFastOrders_Response } from "@/types/api-types";

export default function CreateReturnInvoice_Page() {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const orderId = +useSearchParams()[0].get("id")!;
  const order = queryClient.getQueryData<GetFastOrders_Response>([queryKeys.myFastOrders])?.items.find(({ id }) => id == orderId);
  const { t } = useTranslation();

  return (
    <Form_Page heading={t("forms.returnInvoice.heading")}>
      {order ? (
        <CreateReturnInvoice orderId={orderId} isScheduledOrder={pathname.split("/").includes("scheduled")} />
      ) : (
        <p className="text-center text-muted-foreground">{t("pages.returnInvoice.wrongSource")}</p>
      )}
    </Form_Page>
  );
}
