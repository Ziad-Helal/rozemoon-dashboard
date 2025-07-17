import { Dialog } from "@/components";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatNumber, handleDirectionChange, Language } from "@/localization";
import { PackageX } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface UpdateDamageCart_Props {
  productName: string;
  cartQuantity: number;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  tooltip?: string;
}

export default function UpdateDamageCart({ productName, cartQuantity, children, isOpen, setIsOpen, tooltip }: UpdateDamageCart_Props) {
  const { i18n, t } = useTranslation();

  return (
    <Dialog
      title={(cartQuantity ? t("keyWords.update") : t("keyWords.add")) + " " + t("keyWords.product")}
      description={
        (cartQuantity
          ? t("tableActions.updateDamageCart.description.1.1") + productName + t("tableActions.updateDamageCart.description.1.2")
          : t("tableActions.updateDamageCart.description.2.1") + productName + t("tableActions.updateDamageCart.description.2.2")) +
        t("tableActions.updateDamageCart.description.3")
      }
      toolTip={tooltip}
      trigger={
        <div className="relative">
          <Button variant="destructive" size="icon" icon={PackageX}>
            {tooltip}
          </Button>
          {cartQuantity ? (
            <span
              className={cn("absolute bottom-0 translate-y-1/3 text-xs bg-background px-1 rounded-full", handleDirectionChange(i18n.dir(), "right-0", "left-0"))}
              onClick={(e) => e.stopPropagation()}
            >
              {formatNumber(i18n.language as Language, cartQuantity, "decimal")}
            </span>
          ) : null}
        </div>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </Dialog>
  );
}
