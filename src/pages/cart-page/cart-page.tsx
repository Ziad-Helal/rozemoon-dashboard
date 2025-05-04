import { Form_Page } from "@/components/layouts";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useClearFastOrderCart, useClearRefillCart } from "@/queries";
import { AuthenticatedUser, FastOrder_Cart, Refill_Cart } from "@/types/api-types";
import { CartItem } from "./components";
import { Button, Separator } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { formatNumber, Language } from "@/localization";
import { EraserIcon } from "lucide-react";
import { useState } from "react";
import { AlertDialog, Dialog } from "@/components";
import { FastOrder_Form, StockRefill_Form } from "@/components/forms";

export default function Cart_Page() {
  const { i18n, t } = useTranslation();
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const fastOrderCart = useQuerySubscribe<FastOrder_Cart>([queryKeys.fastOrderCart]);
  const stockRefillCart = useQuerySubscribe<Refill_Cart>([queryKeys.refillCart]);
  const { mutateAsync: clearFastOrderCart } = useClearFastOrderCart();
  const { mutateAsync: clearRefillCart } = useClearRefillCart();
  const userRole = user?.roles[0];
  const cartDiscount = fastOrderCart!.discount / fastOrderCart!.originalPrice;

  return (
    <Form_Page heading={userRole == "Cashier" ? t("pages.cart.heading.fastOrder") : t("pages.cart.heading.scheuledOrder")}>
      {(userRole == "Cashier" ? fastOrderCart : stockRefillCart)?.items.length ? (
        <div className="space-y-2">
          {(userRole == "Cashier" ? fastOrderCart : stockRefillCart)!.items.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
          <Separator className="!my-6" />
          <div className="p-3 border rounded-lg capitalize">
            {userRole == "Cashier" ? (
              <>
                <p>
                  <span className="font-medium">{t("pages.cart.originalPrice")}:</span>{" "}
                  {formatNumber(i18n.language as Language, fastOrderCart!.originalPrice, "currency", "SAR", "name")}
                </p>
                <p>
                  <span className="font-medium">{t("pages.cart.discount")}:</span> {formatNumber(i18n.language as Language, fastOrderCart!.discount, "currency", "SAR", "name")}{" "}
                  {cartDiscount ? <span className="text-muted-foreground">-{formatNumber(i18n.language as Language, cartDiscount, "percent")}</span> : null}
                </p>
                <p>
                  <span className="font-medium text-lg">{t("pages.cart.finalPrice")}:</span>{" "}
                  {formatNumber(i18n.language as Language, fastOrderCart!.finalPrice, "currency", "SAR", "name")}
                </p>
              </>
            ) : (
              <p>
                <span className="font-medium text-lg">{t("pages.cart.totalCost")}:</span>{" "}
                {formatNumber(i18n.language as Language, stockRefillCart!.totalPrice, "currency", "SAR", "name")}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Dialog
              title={t("pages.cart.modal.title") + (userRole == "Cashier" ? t("keyWords.fast order") : t("keyWords.stockRefillRequest"))}
              description={t("pages.cart.modal.description") + (userRole == "Cashier" ? t("keyWords.fast order") : t("keyWords.stockRefillRequest"))}
              trigger={<Button>{t("keyWords.continue")}</Button>}
              isOpen={isCreateOrderOpen}
              setIsOpen={setIsCreateOrderOpen}
            >
              {userRole == "Cashier" ? (
                <FastOrder_Form
                  products={fastOrderCart!.items.map(({ productId, cartQuantity }) => ({ productId, quantity: cartQuantity }))}
                  onSuccess={() => setIsCreateOrderOpen(false)}
                />
              ) : (
                <StockRefill_Form
                  products={stockRefillCart!.items.map(({ productId, cartQuantity, purchasePrice }) => ({ productId, quantity: cartQuantity, price: purchasePrice }))}
                  onSuccess={() => setIsCreateOrderOpen(false)}
                />
              )}
            </Dialog>
            <AlertDialog
              message={t("pages.cart.clearAlert")}
              trigger={
                <Button variant="destructive" leftIcon={EraserIcon} iconClassName="opacity-100">
                  {t("keyWords.clear")}
                </Button>
              }
              onConfirm={() => (userRole == "Cashier" ? clearFastOrderCart() : clearRefillCart())}
              submitPhrase={t("keyWords.clear")}
            />
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground text-center">{t("pages.cart.empty")}</p>
      )}
    </Form_Page>
  );
}
