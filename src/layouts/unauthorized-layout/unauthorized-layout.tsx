import { Container } from "@/components/layouts";
import { Unauthorized_LayoutHeader } from "./components";
import { Outlet } from "react-router";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components";

export default function Unauthorized_Layout() {
  return (
    <>
      <Unauthorized_LayoutHeader />
      <Container className="flex flex-col items-center justify-center">
        <Suspense fallback={<LoadingSpinner isFullPage />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
}
