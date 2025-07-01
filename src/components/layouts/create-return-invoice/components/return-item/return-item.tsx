import type { Dispatch, SetStateAction } from "react";
import type { FastOrderItem, ReturnedProduct, ScheduledOrderItem } from "@/types/api-types";
import { Image } from "@/components/misc";
import { QuantityInput } from "@/components/advanced-input/components";

const imagesFolder = import.meta.env.VITE_API_BASE_URL + "StaticFiles/images/";

interface ReturnItem_Props {
  item: FastOrderItem | ScheduledOrderItem;
  setInvoiceItems: Dispatch<SetStateAction<ReturnedProduct[]>>;
}

export default function ReturnItem({ item, setInvoiceItems }: ReturnItem_Props) {
  const { productId, productName, productType, productImages, price, discountPercentage, quantity } = item;

  return (
    <div className="p-2 rounded-md border">
      <Image src={imagesFolder + productImages[0].imageUrl} containerProps={{ className: "size-10" }} />
      <p>{productName}</p>
      form
    </div>
  );
}
