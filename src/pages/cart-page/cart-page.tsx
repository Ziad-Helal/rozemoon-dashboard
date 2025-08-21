import { Form_Page } from "@/components/layouts";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useClearFastOrderCart, useClearRefillCart, useUpdateFastOrderCartPriceType } from "@/queries";
import { CartItem, Choosen_User, OrderUser, Services } from "./components";
import { Button, Separator, Switch } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { formatNumber, Language } from "@/localization";
import { EraserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AlertDialog, Dialog } from "@/components";
import { FastOrder_Form, StockRefill_Form } from "@/components/forms";
import { cn, switchPrices } from "@/lib/utils";
import type { AuthenticatedUser, Client, CreateGuestUser_Request, FastOrder_Cart, Pagination, Refill_Cart } from "@/types/api-types";

export default function Cart_Page() {
  const { i18n, t } = useTranslation();
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [orderUser, setOrderUser] = useState<Partial<CreateGuestUser_Request>>();
  const [confirmedOrderUser, setConfirmedOrderUser] = useState<{ guestName: string; guestPhone: string }>();
  const orderUsers = useQuerySubscribe<{ items: Client[]; pagination: Pagination }>([queryKeys.orderUsers])?.items;
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const fastOrderCart = useQuerySubscribe<FastOrder_Cart>([queryKeys.fastOrderCart]);
  const stockRefillCart = useQuerySubscribe<Refill_Cart>([queryKeys.refillCart]);
  const { mutateAsync: setPriceType } = useUpdateFastOrderCartPriceType();
  const { mutateAsync: clearFastOrderCart } = useClearFastOrderCart();
  const { mutateAsync: clearRefillCart } = useClearRefillCart();
  const userRole = user?.roles[0];
  const cartDiscount = switchPrices(
    fastOrderCart!.priceType,
    fastOrderCart!.indiDiscount / fastOrderCart!.originalIndiPrice,
    fastOrderCart!.merchDiscount / fastOrderCart!.originalMerchPrice,
    fastOrderCart!.discount / fastOrderCart!.originalPrice
  );

  useEffect(() => {
    const choosenUser = orderUsers?.find((user) => user.id == orderUser?.customerId);
    setConfirmedOrderUser(
      orderUser
        ? orderUser.customerId
          ? choosenUser
            ? { guestName: choosenUser.firstName + " " + choosenUser.lastName, guestPhone: choosenUser.phoneNumber }
            : undefined
          : { guestName: orderUser.guestName!, guestPhone: orderUser.guestPhoneCode + " " + orderUser.guestPhoneNumber! }
        : undefined
    );
  }, [orderUser, orderUsers]);

  return (
    <Form_Page
      heading={userRole == "Cashier" ? t("pages.cart.heading.fastOrder") : t("pages.cart.heading.scheuledOrder")}
      quickActions={
        userRole == "Cashier" ? (
          <div className="flex items-center gap-2 text-sm capitalize">
            <p>{t("types&statuses.productPricingType.merchant")}</p>
            <Switch defaultChecked={fastOrderCart!.priceType == "indi"} onCheckedChange={(isIndi) => setPriceType(isIndi ? "indi" : "merch")} />
            <p>{t("types&statuses.productPricingType.individual")}</p>
          </div>
        ) : undefined
      }
    >
      {(userRole == "Cashier" ? fastOrderCart : stockRefillCart)?.items.length ? (
        <div className="space-y-2">
          {(userRole == "Cashier" ? fastOrderCart : stockRefillCart)!.items.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
          <Separator className="!my-6" />
          {userRole == "Cashier" ? (
            <>
              <Services />
              <Separator className="!my-6" />
              <OrderUser
                setOrderUser={setOrderUser}
                user={{ ...orderUser, guestName: orderUser?.guestName || "", guestPhoneCode: orderUser?.guestPhoneCode || "", guestPhoneNumber: orderUser?.guestPhoneNumber || "" }}
              />
              {confirmedOrderUser ? <Choosen_User user={confirmedOrderUser} /> : null}
            </>
          ) : null}
          <div className={cn("p-3 border rounded-lg capitalize transition-colors", fastOrderCart?.priceType == "indi" ? "bg-primary/25" : "")}>
            {userRole == "Cashier" ? (
              <>
                <p>
                  <span className="font-medium">{t("pages.cart.originalPrice")}:</span>{" "}
                  {formatNumber(
                    i18n.language as Language,
                    switchPrices(fastOrderCart!.priceType, fastOrderCart!.originalIndiPrice, fastOrderCart!.originalMerchPrice, fastOrderCart!.originalPrice),
                    "currency",
                    user?.currency!,
                    "name"
                  )}
                </p>
                <p>
                  <span className="font-medium">{t("pages.cart.discount")}:</span>{" "}
                  {formatNumber(
                    i18n.language as Language,
                    switchPrices(fastOrderCart!.priceType, fastOrderCart!.indiDiscount, fastOrderCart!.merchDiscount, fastOrderCart!.discount),
                    "currency",
                    user?.currency!,
                    "name"
                  )}{" "}
                  {cartDiscount ? <span className="text-muted-foreground">-{formatNumber(i18n.language as Language, cartDiscount, "percent")}</span> : null}
                </p>
                <p>
                  <span className="font-medium text-lg">{t("pages.cart.finalPrice")}:</span>{" "}
                  {formatNumber(
                    i18n.language as Language,
                    switchPrices(fastOrderCart!.priceType, fastOrderCart!.finalIndiPrice, fastOrderCart!.finalMerchPrice, fastOrderCart!.finalPrice),
                    "currency",
                    user?.currency!,
                    "name"
                  )}
                </p>
              </>
            ) : (
              <p>
                <span className="font-medium text-lg">{t("pages.cart.totalCost")}:</span>{" "}
                {formatNumber(i18n.language as Language, stockRefillCart!.totalPrice, "currency", user?.currency!, "name")}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Dialog
              title={t("pages.cart.modal.title") + (userRole == "Cashier" ? t("keyWords.fast order") : t("keyWords.stockRefillRequest"))}
              description={t("pages.cart.modal.description") + (userRole == "Cashier" ? t("keyWords.fast order") : t("keyWords.stockRefillRequest"))}
              trigger={<Button disabled={userRole == "Cashier" && !confirmedOrderUser}>{t("keyWords.continue")}</Button>}
              isOpen={isCreateOrderOpen}
              setIsOpen={setIsCreateOrderOpen}
            >
              {userRole == "Cashier" ? (
                <FastOrder_Form
                  products={fastOrderCart!.items.map(({ productId, cartQuantity }) => ({ productId, quantity: cartQuantity }))}
                  user={orderUser!}
                  onSuccess={() => {
                    clearFastOrderCart();
                    setIsCreateOrderOpen(false);
                  }}
                />
              ) : (
                <StockRefill_Form
                  products={stockRefillCart!.items.map(({ productId, cartQuantity, purchasePrice }) => ({ productId, quantity: cartQuantity, price: purchasePrice }))}
                  onSuccess={() => {
                    clearRefillCart();
                    setIsCreateOrderOpen(false);
                  }}
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
