import { ButtonLink, ColorTheme_Toggler, Language_Toggler, ToolTip } from "@/components";
import { Separator, SidebarTrigger } from "@/components/ui";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys } from "@/queries";
import { routes } from "@/routes";
import { AuthenticatedUser, FastOrder_Cart } from "@/types/api-types";
import { BellRingIcon, PackageXIcon, ShoppingBasketIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Main_LayoutHeader() {
  const { t } = useTranslation();
  const userRole = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth])!.roles[0];
  const fastOrderCart = useQuerySubscribe<FastOrder_Cart>([queryKeys.fastOrderCart]);
  const StockRefillCart = useQuerySubscribe<FastOrder_Cart>([queryKeys.refillCart]);
  const damageCart = useQuerySubscribe<FastOrder_Cart>([queryKeys.damageCart]);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b">
      <div className="flex items-center gap-2 px-3">
        <ToolTip content={t("header.toggleSidebar")} trigger={<SidebarTrigger />} />
        <Separator orientation="vertical" className="me-2 h-5" />
        <p className="uppercase text-2xl lg:text-3xl font-medium text-primary">{t(`userRoles.${userRole}`)}</p>
      </div>
      <div className="flex items-center gap-2 px-3">
        {userRole == "StoreKeeper" && <ButtonLink route={routes.damageCart} tip={t("header.damageCart")} count={damageCart?.items.length} icon={PackageXIcon} />}
        {(userRole == "StoreKeeper" || userRole == "Cashier") && (
          <ButtonLink route={routes.cart} tip={t("header.cart")} count={fastOrderCart?.items.length || StockRefillCart?.items.length} icon={ShoppingBasketIcon} />
        )}
        <ButtonLink route={routes.liveNotifications} tip={t("header.liveNotifications")} count={2} icon={BellRingIcon} className="2xl:hidden" />
        <Language_Toggler />
        <ColorTheme_Toggler />
      </div>
    </header>
  );
}
