import { cn } from "@/lib/utils";
import { formatNumber, Language } from "@/localization";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface ProductPreparedQuantity_Badge_Props {
  toBe: "added" | "reduced";
  id: number;
  quantitiy: number;
  quantitiyDifference: number;
  setToBeAdded: Dispatch<SetStateAction<{ productId: number; quantity: number }[]>>;
  setToBeReduced: Dispatch<SetStateAction<{ productId: number; quantity: number }[]>>;
}

export default function ProductPreparedQuantity_Badge({ toBe, id, quantitiy, quantitiyDifference }: ProductPreparedQuantity_Badge_Props) {
  const { i18n } = useTranslation();

  //   function clearBadge() {
  //     if (toBe == "added") setToBeAdded((prevState) => clearFromState([...prevState], "productId", id));
  //     else setToBeReduced((prevState) => clearFromState([...prevState], "productId", id));
  //   }

  return (
    <span
      className={cn(
        "border rounded-full pe-1.5 flex gap-1 relative [&:hover_button]:opacity-100",
        toBe == "added" ? "text-green-500 border-green-500" : "text-destructive border-destructive"
      )}
    >
      <span className="text-muted-foreground bg-muted px-1 rounded-s-full">#{formatNumber(i18n.language as Language, id, "decimal")}</span>
      <span>
        {formatNumber(i18n.language as Language, quantitiy, "decimal")} {toBe == "added" ? "+" : "-"} {formatNumber(i18n.language as Language, quantitiyDifference, "decimal")} ={" "}
        {toBe == "added"
          ? formatNumber(i18n.language as Language, quantitiy + quantitiyDifference, "decimal")
          : formatNumber(i18n.language as Language, quantitiy - quantitiyDifference, "decimal")}
      </span>
      {/* <Button
        variant="secondary"
        size="icon"
        icon={XIcon}
        className={cn("absolute top-0 -translate-y-1/2 rounded-full size-4 opacity-0 transition-opacity", handleDirectionChange(i18n.dir(), "right-0", "left-0"))}
        iconClassName="size-1!"
        onClick={clearBadge}
      >
        {t("keyWords.remove")}
      </Button> */}
    </span>
  );
}
