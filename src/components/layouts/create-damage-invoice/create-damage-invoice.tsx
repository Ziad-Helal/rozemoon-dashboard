import { useCreateDamageInvoice } from "@/queries";
import { useState } from "react";
import { Button } from "@/components/ui";
import { badHint } from "@/services/hint";
import { useTranslation } from "react-i18next";
import type { mergeTypes } from "zod";
import type { CreateDamageInvoice as CreateDamageInvoice_Request, CreateDamageInvoiceItem, FastOrder, ScheduledOrder } from "@/types/api-types";
import { DamageInvoice_Form } from "@/components/forms";
import { DamageItem } from "./components";

interface CreateDamageInvoice_Props {
  orderId: number;
  order: mergeTypes<FastOrder, ScheduledOrder>;
  isScheduledOrder?: boolean;
}

export default function CreateDamageInvoice({ orderId, order, isScheduledOrder }: CreateDamageInvoice_Props) {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useCreateDamageInvoice();
  const [invoiceData, setInvoiceData] = useState<Omit<CreateDamageInvoice_Request, "items">>({
    orderType: isScheduledOrder ? "booking" : "order",
    orderId: isScheduledOrder ? undefined : orderId,
    bookingId: isScheduledOrder ? orderId : undefined,
  });
  const [invoiceItems, setInvoiceItems] = useState<CreateDamageInvoiceItem[]>([]);

  function submitHandler() {
    if (invoiceItems.length) mutateAsync({ ...invoiceData, items: invoiceItems });
    else badHint(t("hints.good.invoiceWithNoProdcts"));
  }

  return (
    <section>
      <DamageInvoice_Form
        orderId={(isScheduledOrder ? "S" : "") + orderId}
        getValues={(values) =>
          setInvoiceData((prevData) => ({ ...prevData, ...values, orderId: isScheduledOrder ? undefined : orderId, bookingId: isScheduledOrder ? orderId : undefined }))
        }
        isSubmitting={isPending}
      />
      <div className="bg-secondary/25 p-2 mt-3 space-y-3 rounded-xl">
        {order[isScheduledOrder ? "bookingItems" : "orderItems"].map((item) => (
          <DamageItem key={item.id} item={item} currency={order.currency} setInvoiceItems={setInvoiceItems} />
        ))}
      </div>
      <Button onClick={submitHandler}>{t("forms.submit")}</Button>
    </section>
  );
}
