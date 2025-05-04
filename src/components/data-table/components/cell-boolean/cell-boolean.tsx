import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface CellBoolean_Props {
  value: boolean;
  falseIsDestructive?: boolean;
}

export default function CellBoolean({ value, falseIsDestructive }: CellBoolean_Props) {
  const { t } = useTranslation();

  return (
    <p
      className={cn(
        "capitalize",
        falseIsDestructive == undefined ? "text-foreground" : falseIsDestructive ? (value ? "text-green-600" : "text-destructive") : value ? "text-destructive" : "text-green-600"
      )}
    >
      {value ? t("keyWords.yes") : t("keyWords.no")}
    </p>
  );
}
