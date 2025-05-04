import { UpdateFastOrderCart_Form, UpdateRefillCart_Form } from "@/components/forms";
import { UpdateCart } from "@/components/table-actions";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys } from "@/queries";
import { AuthenticatedUser, FastOrder_Cart, Refill_Cart, StockProduct } from "@/types/api-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props extends StockProduct {}

export default function Actions(product: Actions_Props) {
  const { t } = useTranslation();
  const [addToCartIsOpen, setAddToCartIsOpen] = useState(false);
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const fastOrderCart = useQuerySubscribe<FastOrder_Cart>([queryKeys.fastOrderCart]);
  const stockRefillCart = useQuerySubscribe<Refill_Cart>([queryKeys.refillCart]);
  const cartQuantity =
    fastOrderCart!.items.find(({ productId }) => productId == product.productId)?.cartQuantity ||
    stockRefillCart!.items.find(({ productId }) => productId == product.productId)?.cartQuantity ||
    0;
  const purchasePrice = stockRefillCart!.items.find(({ productId }) => productId == product.productId)?.purchasePrice || null;
  const userRole = user?.roles[0];

  return userRole == "Cashier" || userRole == "StoreKeeper" ? (
    <UpdateCart
      productName={product.name}
      cartQuantity={cartQuantity}
      isOpen={addToCartIsOpen}
      setIsOpen={setAddToCartIsOpen}
      tooltip={cartQuantity ? t("tableActions.updateCart.tooltip.1") : t("tableActions.updateCart.tooltip.2")}
    >
      {userRole == "Cashier" ? (
        <UpdateFastOrderCart_Form defaultValues={{ cartQuantity }} product={product} onSuccess={() => setAddToCartIsOpen(false)} />
      ) : (
        <UpdateRefillCart_Form defaultValues={{ cartQuantity, purchasePrice }} product={product} onSuccess={() => setAddToCartIsOpen(false)} />
      )}
    </UpdateCart>
  ) : null;
}
