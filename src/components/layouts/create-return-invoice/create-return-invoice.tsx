import ReturnItem from "./components";
import { ReturnInvoice_Form } from "@/components/forms";
import { queryKeys } from "@/queries";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { mergeTypes } from "zod";
import type { CreateReturnInvoice as CreateReturnInvoice_Request, CreateReturnInvoiceItem, FastOrder, Pagination, ScheduledOrder } from "@/types/api-types";

interface CreateReturnInvoice_Props {
  orderId: number;
  isScheduledOrder?: boolean;
}

export default function CreateReturnInvoice({ orderId, isScheduledOrder }: CreateReturnInvoice_Props) {
  const queryClient = useQueryClient();
  const order = queryClient
    .getQueryData<{ items: mergeTypes<FastOrder, ScheduledOrder>[]; pagination: Pagination }>([queryKeys[isScheduledOrder ? "storeScheduledOrders" : "myFastOrders"]])!
    .items.find(({ id }) => id == orderId)!;
  const [invoiceData, setInvoiceData] = useState<Omit<CreateReturnInvoice_Request, "items">>({ orderType: isScheduledOrder ? "booking" : "order" });
  const [invoiceItems, setInvoiceItems] = useState<CreateReturnInvoiceItem[]>([]);

  return (
    <section>
      <ReturnInvoice_Form
        orderId={(isScheduledOrder ? "S" : "") + orderId}
        getValues={(values) =>
          setInvoiceData((prevData) => ({ ...prevData, ...values, orderId: isScheduledOrder ? undefined : orderId, bookingId: isScheduledOrder ? orderId : undefined }))
        }
        isSubmitting={false}
      />
      <div className="bg-secondary/25 p-2 mt-3 space-y-3 rounded-xl">
        {order[isScheduledOrder ? "bookingItems" : "orderItems"].map((item) => (
          <ReturnItem key={item.id} item={item} currency={order.currency} setInvoiceItems={setInvoiceItems} />
        ))}
      </div>
    </section>
  );
}
