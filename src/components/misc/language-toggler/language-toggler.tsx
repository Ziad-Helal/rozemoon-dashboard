import { ToolTip } from "@/components";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import { languageChanger, languages } from "@/localization";
import { useTranslation } from "react-i18next";

export default function Language_Toggler() {
  const { i18n, t } = useTranslation();

  return (
    <DropdownMenu dir={i18n.dir()}>
      <ToolTip
        content={t("header.language")}
        trigger={
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="uppercase">
              {i18n.language}
              <span className="sr-only">{t("header.language")}</span>
            </Button>
          </DropdownMenuTrigger>
        }
      />
      <DropdownMenuContent align="end">
        {languages.map(({ code, name }) => (
          <DropdownMenuItem key={code} className={cn("capitalize", code == i18n.language ? "bg-secondary" : "")} onClick={() => languageChanger(code)}>
            <span className="uppercase font-semibold text-xs">{code}</span>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
