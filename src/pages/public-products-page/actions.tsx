import { UpdateRefillCart_Form } from "@/components/forms";
import { UpdateCart } from "@/components/table-actions";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys } from "@/queries";
import { AuthenticatedUser, Refill_Cart, Refill_CartItem } from "@/types/api-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props extends Omit<Refill_CartItem, "cartQuantity" | "purchasePrice" | "productId"> {}

export default function Actions(product: Actions_Props) {
  const { t } = useTranslation();
  const [addToCartIsOpen, setAddToCartIsOpen] = useState(false);
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const stockRefillCart = useQuerySubscribe<Refill_Cart>([queryKeys.refillCart]);
  const cartProduct = stockRefillCart!.items.find(({ productId }) => productId == product.id);

  return user?.roles[0] == "StoreKeeper" ? (
    <UpdateCart
      productName={product.name}
      cartQuantity={cartProduct?.cartQuantity || 0}
      isOpen={addToCartIsOpen}
      setIsOpen={setAddToCartIsOpen}
      tooltip={cartProduct?.cartQuantity ? t("tableActions.updateCart.tooltip.1") : t("tableActions.updateCart.tooltip.2")}
    >
      <UpdateRefillCart_Form
        defaultValues={{ cartQuantity: cartProduct?.cartQuantity || 0, purchasePrice: cartProduct?.purchasePrice || null }}
        product={{ ...product, productId: product.id }}
        onSuccess={() => setAddToCartIsOpen(false)}
      />
    </UpdateCart>
  ) : null;
}
