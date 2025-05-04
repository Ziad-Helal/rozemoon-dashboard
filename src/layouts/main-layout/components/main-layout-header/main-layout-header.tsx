import { ColorTheme_Toggler, Language_Toggler, ToolTip } from "@/components";
import { Button, Separator, SidebarTrigger } from "@/components/ui";
import { useQuerySubscribe } from "@/hooks/misc";
import { cn } from "@/lib/utils";
import { formatNumber, handleDirectionChange, Language } from "@/localization";
import { queryKeys } from "@/queries";
import { routes } from "@/routes";
import { AuthenticatedUser, FastOrder_Cart } from "@/types/api-types";
import { ShoppingBasketIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function Main_LayoutHeader() {
  const { i18n, t } = useTranslation();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const fastOrderCart = useQuerySubscribe<FastOrder_Cart>([queryKeys.fastOrderCart]);
  const StockRefillCart = useQuerySubscribe<FastOrder_Cart>([queryKeys.refillCart]);
  const cartItems = fastOrderCart?.items.length || StockRefillCart?.items.length;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b">
      <div className="flex items-center gap-2 px-3">
        <ToolTip content={t("header.toggleSidebar")} trigger={<SidebarTrigger />} />
        <Separator orientation="vertical" className="me-2 h-5" />
        <p className="uppercase text-2xl lg:text-3xl font-medium text-primary">{t(`userRoles.${user!.roles[0]}`)}</p>
      </div>
      <div className="flex items-center gap-2 px-3">
        {(user?.roles[0] == "StoreKeeper" || user?.roles[0] == "Cashier") && (
          <ToolTip
            content={t("header.cart")}
            trigger={
              <Link to={routes.cart} className="relative" tabIndex={-1}>
                <Button variant="outline" size="icon" icon={ShoppingBasketIcon}>
                  {t("header.cart")}
                </Button>
                {cartItems ? (
                  <span className={cn("absolute bottom-0 translate-y-1/3 text-xs bg-background px-1 rounded-full", handleDirectionChange(i18n.dir(), "right-0", "left-0"))}>
                    {formatNumber(i18n.language as Language, cartItems, "decimal")}
                  </span>
                ) : null}
              </Link>
            }
          />
        )}
        <Language_Toggler />
        <ColorTheme_Toggler />
      </div>
    </header>
  );
}
