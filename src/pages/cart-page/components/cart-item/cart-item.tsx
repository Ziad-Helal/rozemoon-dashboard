import { Image, ToolTip } from "@/components";
import { UpdateFastOrderCart_Form, UpdateRefillCart_Form } from "@/components/forms";
import { UpdateCart } from "@/components/table-actions";
import { Button } from "@/components/ui";
import { useQuerySubscribe } from "@/hooks/misc";
import { cn } from "@/lib/utils";
import { formatNumber, handleDirectionChange, Language } from "@/localization";
import { queryKeys, useRemoveFromFastOrderCart, useRemoveFromRefillCart } from "@/queries";
import { AuthenticatedUser, FastOrder_CartItem, Refill_CartItem } from "@/types/api-types";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface CartItem_Props {
  product: FastOrder_CartItem | Refill_CartItem;
}

export default function CartItem({ product }: CartItem_Props) {
  const { productId, name, images, productType, cartQuantity } = product;
  const { discountPercentage, price, newPrice, totalPrice, totalDiscount } = product as FastOrder_CartItem;
  const { purchasePrice } = product as Refill_CartItem;
  const { i18n, t } = useTranslation();
  const [updateCartIsOpen, setUpdateCartIsOpen] = useState(false);
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { mutateAsync: removeOrderProduct } = useRemoveFromFastOrderCart();
  const { mutateAsync: removeRefillProduct } = useRemoveFromRefillCart();

  return (
    <div className="relative p-3 rounded-lg border flex gap-4 items-start justify-between">
      <div className="grid gap-2 grid-cols-[auto_1fr]">
        <Image src={baseUrl + images[0].imageUrl} containerProps={{ className: "size-12 lg:size-20 rounded" }} className="object-cover" />
        <div>
          <h3 className="lg:text-2xl">{name}</h3>
          <p className="text-muted-foreground text-sm capitalize">
            {totalDiscount ? (
              <>
                -{formatNumber(i18n.language as Language, discountPercentage / 100, "percent")}{" "}
                <span className="line-through">{formatNumber(i18n.language as Language, price, "decimal")}</span>{" "}
              </>
            ) : null}
            {formatNumber(i18n.language as Language, newPrice || purchasePrice, "currency", "SAR", "name")} / {t(`keyWords.${productType.toLowerCase() as "stem" | "bunch"}`)}
          </p>
          <p className="capitalize">
            {t("pages.cart.totalCost")}:{" "}
            {totalDiscount ? (
              <>
                <span className="line-through text-muted-foreground">{formatNumber(i18n.language as Language, totalPrice + totalDiscount, "decimal")}</span>{" "}
              </>
            ) : null}
            {formatNumber(i18n.language as Language, totalPrice || purchasePrice * cartQuantity, "currency", "SAR", "name")}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex-1 flex items-center gap-2">
          <UpdateCart
            productName={product.name}
            cartQuantity={cartQuantity}
            isOpen={updateCartIsOpen}
            setIsOpen={setUpdateCartIsOpen}
            tooltip={t("pages.cart.card.updateQuantity")}
          >
            {user?.roles[0] == "Cashier" ? (
              <UpdateFastOrderCart_Form defaultValues={{ cartQuantity }} product={product as FastOrder_CartItem} onSuccess={() => setUpdateCartIsOpen(false)} />
            ) : (
              <UpdateRefillCart_Form defaultValues={{ cartQuantity, purchasePrice }} product={product as Refill_CartItem} onSuccess={() => setUpdateCartIsOpen(false)} />
            )}
          </UpdateCart>
          <ToolTip
            content={t("pages.cart.card.remove")}
            trigger={
              <Button
                variant="destructive"
                size="icon"
                icon={Trash2Icon}
                onClick={() => (user?.roles[0] == "Cashier" ? removeOrderProduct(productId) : removeRefillProduct(productId))}
              >
                {t("pages.cart.card.remove")}
              </Button>
            }
          />
        </div>
      </div>
      <p className={cn("text-muted-foreground text-end absolute bottom-2", handleDirectionChange(i18n.dir(), "right-3", "left-3"))}>
        #{formatNumber(i18n.language as Language, productId, "decimal")}
      </p>
    </div>
  );
}
