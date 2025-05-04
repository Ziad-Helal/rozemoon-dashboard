import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui";
import { useQuerySubscribe } from "@/hooks/misc";
import { logOut } from "@/lib/utils";
import { formatNumber, Language } from "@/localization";
import { queryKeys } from "@/queries";
import { routes } from "@/routes";
import { AuthenticatedUser } from "@/types/api-types";
import { useQueryClient } from "@tanstack/react-query";
import { BadgeCheckIcon, BellIcon, ChevronsUpDownIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

export default function UserMenu() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { isMobile } = useSidebar();
  const queryClient = useQueryClient();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user && (
          <SidebarMenuButton size="lg" className="data-[state=open]:bg-primary/25 data-[state=open]:text-sidebar-accent-foreground">
            <Avatar className="size-8 rounded-lg">
              <AvatarFallback className="rounded-lg">{t(`userRoles.${user.roles[0]}`)[0]}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-start text-sm leading-tight">
              <span className="truncate font-semibold flex items-center justify-between">
                <span>
                  {t(`userRoles.${user.roles[0]}`)} {user.branchId ? formatNumber(i18n.language as Language, user.branchId, "decimal") : null}
                </span>
                {formatNumber(i18n.language as Language, user.userId, "decimal")}
              </span>
              <span className="truncate text-xs normal-case">{user.email}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </SidebarMenuButton>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          {user && (
            <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg">{t(`userRoles.${user.roles[0]}`)[0]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-semibold flex items-center justify-between">
                  <span className="capitalize">
                    {t(`userRoles.${user.roles[0]}`)} {user.branchId ? formatNumber(i18n.language as Language, user.branchId, "decimal") : null}
                  </span>
                  {formatNumber(i18n.language as Language, user.userId, "decimal")}
                </span>
                <span className="truncate text-xs normal-case">{user.email}</span>
              </div>
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="capitalize">
          <DropdownMenuItem asChild>
            <Link to={routes.profile}>
              <BadgeCheckIcon />
              {t("header.navigationMenu.profile")}
            </Link>
          </DropdownMenuItem>
          {user?.roles[0] != "Admin" && (
            <DropdownMenuItem asChild>
              <Link to={routes.myNotifications}>
                <BellIcon />
                {t("header.navigationMenu.notifications")}
              </Link>
            </DropdownMenuItem>
          )}
          {user?.roles[0] == "Admin" && (
            <DropdownMenuItem asChild>
              <Link to={routes.settings}>
                <SettingsIcon />
                {t("header.navigationMenu.settings")}
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => logOut(queryClient, navigate)} className="hover:!bg-destructive/75" asChild>
          <Button variant="destructive" size="sm" leftIcon={LogOutIcon} className="font-normal w-full justify-start" iconClassName="opacity-100">
            {t("keyWords.signOut")}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
