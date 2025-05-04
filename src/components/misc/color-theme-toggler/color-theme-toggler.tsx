import { ToolTip } from "@/components";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui";
import { Theme, useTheme } from "./color-theme-provider";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const colorThemes: Theme[] = ["light", "dark", "system"];

export function ColorTheme_Toggler() {
  const { i18n, t } = useTranslation();
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <DropdownMenu dir={i18n.dir()}>
      <ToolTip
        content={t("header.colorTheme.tooltip")}
        trigger={
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
              <span className="sr-only">{t("header.colorTheme.tooltip")}</span>
            </Button>
          </DropdownMenuTrigger>
        }
      />
      <DropdownMenuContent align="end">
        {colorThemes.map((theme) => (
          <DropdownMenuItem key={theme} className={cn("capitalize", theme == currentTheme ? "bg-secondary" : "")} onClick={() => setTheme(theme)}>
            {theme == "light" ? <SunIcon /> : theme == "dark" ? <MoonIcon /> : <MonitorIcon />}
            {t(`header.colorTheme.themes.${theme}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
