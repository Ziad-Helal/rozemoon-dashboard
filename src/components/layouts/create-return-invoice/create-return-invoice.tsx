import ReturnItem from "./components";
import { ReturnInvoice_Form } from "@/components/forms";
import { queryKeys } from "@/queries";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { mergeTypes } from "zod";
import type { CreateReturnInvoice as CreateReturnInvoice_Request, FastOrder, Pagination, ReturnedProduct, ScheduledOrder } from "@/types/api-types";
import type { FormFields } from "@/components/forms/return-invoice-form/form-data";

interface CreateReturnInvoice_Props {
  orderId: number;
  isScheduledOrder?: boolean;
}

export default function CreateReturnInvoice({ orderId, isScheduledOrder }: CreateReturnInvoice_Props) {
  const queryClient = useQueryClient();
  const orderItems = queryClient
    .getQueryData<{ items: mergeTypes<FastOrder, ScheduledOrder>[]; pagination: Pagination }>([queryKeys[isScheduledOrder ? "storeScheduledOrders" : "myFastOrders"]])!
    .items.find(({ id }) => id == orderId)![isScheduledOrder ? "bookingItems" : "orderItems"];
  const [invoiceData, setInvoiceData] = useState<Omit<CreateReturnInvoice_Request, "items">>({ orderType: isScheduledOrder ? "booking" : "order" });
  const [invoiceItems, setInvoiceItems] = useState<ReturnedProduct[]>([]);

  function sdfsf(values: FormFields) {
    console.log(values.returnImages);

    setInvoiceData((prevData) => ({ ...prevData, ...values, orderId: isScheduledOrder ? undefined : orderId, bookingId: isScheduledOrder ? orderId : undefined }));
  }

  return (
    <section className="space-y-3">
      <ReturnInvoice_Form orderId={(isScheduledOrder ? "S" : "") + orderId} getValues={sdfsf} isSubmitting={false} />
      {orderItems.map((item) => (
        <ReturnItem key={item.id} item={item} setInvoiceItems={setInvoiceItems} />
      ))}
    </section>
  );
}
