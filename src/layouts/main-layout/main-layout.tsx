import { Outlet } from "react-router";
import { Main_LayoutHeader } from "./components";
import { SidebarInset, SidebarProvider } from "@/components/ui";
import { LoadingSpinner, Sidebar } from "@/components";
import { Container } from "@/components/layouts";
import { useInitializeFastOrderCart, useInitializeRefillCart } from "@/queries";
import { Suspense } from "react";

export default function Main_Layout() {
  useInitializeFastOrderCart();
  useInitializeRefillCart();

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
    </SidebarProvider>
  );
}
