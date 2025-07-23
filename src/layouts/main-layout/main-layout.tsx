import { Outlet } from "react-router";
import { Main_LayoutHeader } from "./components";
import { SidebarInset, SidebarProvider } from "@/components/ui";
import { LoadingSpinner, Sidebar } from "@/components";
import { Container, SideEvents } from "@/components/layouts";
import { useInitializeDamageCart, useInitializeFastOrderCart, useInitializeRefillCart } from "@/queries";
import { Suspense, useEffect } from "react";
import useLiveEvents from "./use-live-events";

export default function Main_Layout() {
  const { refetch: initFastOrderCart } = useInitializeFastOrderCart();
  const { refetch: initRefillCart } = useInitializeRefillCart();
  const { refetch: initDamageCart } = useInitializeDamageCart();
  useLiveEvents();

  useEffect(() => {
    initFastOrderCart();
    initRefillCart();
    initDamageCart();
  }, []);

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Main_LayoutHeader />
        <Container>
          <Suspense fallback={<LoadingSpinner isFullPage />}>
            <Outlet />
          </Suspense>
        </Container>
      </SidebarInset>
      <SideEvents />
    </SidebarProvider>
  );
}
