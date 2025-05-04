import { Outlet } from "react-router";
import { Toaster, TooltipProvider } from "./components/ui";
import { LoadingSpinner, ThemeProvider } from "./components";
import { useLanguageChanger } from "./localization";
import { useFavIconHandler } from "./hooks/misc";
import { useAxios } from "./services/api";
import { startTransition, useEffect, useState } from "react";
import { useRoutesGuard } from "./routes";
import { useTranslation } from "react-i18next";
import "./localization";

export default function App() {
  const { t } = useTranslation();
  const { isPendingAuthentication } = useAxios();
  useLanguageChanger();
  useFavIconHandler();
  useRoutesGuard(isPendingAuthentication);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    if (isFirstLoad && !isPendingAuthentication) {
      setIsFirstLoad(false);
      startTransition(() => {
        setIsAuthenticating(false);
      });
    }
  }, [isPendingAuthentication]);

  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="system">
        {isAuthenticating ? <LoadingSpinner loadingText={t("keyWords.authenticating")} isFullPage /> : <Outlet />}
        <Toaster />
      </ThemeProvider>
    </TooltipProvider>
  );
}
