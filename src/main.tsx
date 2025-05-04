import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { pageRoutes } from "./routes";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, refetchOnReconnect: false, notifyOnChangeProps: "all", staleTime: Infinity, retry: false },
    mutations: { retry: false },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={pageRoutes} />
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
  // </StrictMode>,
);
