import { ReturnInvoice_Form } from "@/components/forms";
import { queryKeys, useCreateReturnInvoice } from "@/queries";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui";
import { ReturnItem } from "./components";
import { badHint } from "@/services/hint";
import { useTranslation } from "react-i18next";
import type { mergeTypes } from "zod";
import type { CreateReturnInvoice as CreateReturnInvoice_Request, CreateReturnInvoiceItem, FastOrder, Pagination, ScheduledOrder } from "@/types/api-types";

interface CreateReturnInvoice_Props {
  orderId: number;
  isScheduledOrder?: boolean;
}

export default function CreateReturnInvoice({ orderId, isScheduledOrder }: CreateReturnInvoice_Props) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useCreateReturnInvoice();
  const order = queryClient
    .getQueryData<{ items: mergeTypes<FastOrder, ScheduledOrder>[]; pagination: Pagination }>([queryKeys[isScheduledOrder ? "storeScheduledOrders" : "myFastOrders"]])!
    .items.find(({ id }) => id == orderId)!;
  const [invoiceData, setInvoiceData] = useState<Omit<CreateReturnInvoice_Request, "items">>({
    orderType: isScheduledOrder ? "booking" : "order",
    orderId: isScheduledOrder ? undefined : orderId,
    bookingId: isScheduledOrder ? orderId : undefined,
  });
  const [invoiceItems, setInvoiceItems] = useState<CreateReturnInvoiceItem[]>([]);

  function submitHandler() {
    if (invoiceItems.length) mutateAsync({ ...invoiceData, items: invoiceItems });
    else badHint(t("hints.good.invoiceWithNoProdcts"));
  }

  return (
    <section>
      <ReturnInvoice_Form
        orderId={(isScheduledOrder ? "S" : "") + orderId}
        getValues={(values) =>
          setInvoiceData((prevData) => ({ ...prevData, ...values, orderId: isScheduledOrder ? undefined : orderId, bookingId: isScheduledOrder ? orderId : undefined }))
        }
        isSubmitting={isPending}
      />
      <div className="bg-secondary/25 p-2 mt-3 space-y-3 rounded-xl">
        {order[isScheduledOrder ? "bookingItems" : "orderItems"].map((item) => (
          <ReturnItem key={item.id} item={item} currency={order.currency} setInvoiceItems={setInvoiceItems} />
        ))}
      </div>
      <Button onClick={submitHandler}>{t("forms.submit")}</Button>
    </section>
  );
}
