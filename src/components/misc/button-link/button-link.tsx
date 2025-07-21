import { ToolTip } from "@/components";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatNumber, handleDirectionChange, type Language } from "@/localization";
import { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

interface ButtonLink_Props {
  route: string;
  tip: string;
  icon: LucideIcon;
  count?: number;
}

export default function ButtonLink({ route, tip, count, icon: Icon }: ButtonLink_Props) {
  const { i18n } = useTranslation();

  return (
    <ToolTip
      content={tip}
      trigger={
        <Link to={route} className="relative" tabIndex={-1}>
          <Button variant="outline" size="icon" icon={Icon}>
            {tip}
          </Button>
          {count ? (
            <span className={cn("absolute bottom-0 translate-y-1/3 text-xs bg-background px-1 rounded-full", handleDirectionChange(i18n.dir(), "right-0", "left-0"))}>
              {formatNumber(i18n.language as Language, count, "decimal")}
            </span>
          ) : null}
        </Link>
      }
    />
  );
}
