import { ComponentProps, useEffect, useState } from "react";
import {
  SheetTitle,
  Sidebar as SideBar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui";
import { navigationRoutes, protectedRoutes } from "@/routes";
import { Logo, UserMenu } from "@/components";
import { NavLink, useLocation } from "react-router";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys } from "@/queries";
import { AuthenticatedUser } from "@/types/api-types";
import { useTranslation } from "react-i18next";

export default function Sidebar(props: ComponentProps<typeof SideBar>) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const [activeLink, setActiveLink] = useState("");
  const { isMobile } = useSidebar();

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <SideBar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {isMobile ? (
                <SheetTitle>
                  <Logo long />
                </SheetTitle>
              ) : (
                <Logo long />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {user && (
          <SidebarGroup>
            <SidebarMenu>
              {navigationRoutes.map(({ title, url, items }) =>
                protectedRoutes[user.roles[0]].includes(url) ? (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton onClick={() => setActiveLink(url)} isActive={activeLink.split("/")[1] == url.split("/")[1]} asChild>
                      <NavLink to={url} className="font-medium">
                        {t(`header.navigationMenu.${title}`, { defaultValue: title })}
                      </NavLink>
                    </SidebarMenuButton>
                    {items?.length ? (
                      <SidebarMenuSub>
                        {items.map(({ title, url }) =>
                          protectedRoutes[user.roles[0]].includes(url) ? (
                            <SidebarMenuSubItem key={title}>
                              <SidebarMenuSubButton onClick={() => setActiveLink(url)} isActive={activeLink == url} asChild>
                                <NavLink to={url}>{t(`header.navigationMenu.${title}`, { defaultValue: title })}</NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ) : null
                        )}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                ) : null
              )}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </SideBar>
  );
}
