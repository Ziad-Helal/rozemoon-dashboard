import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { Currency } from "@/types/api-types";
import { BanknoteIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface UpdateUserWallet_Props {
  id: number;
  children: ReactNode;
  currency: Currency;
  disabled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateUserWallet({ id, children, currency, disabled, isOpen, setIsOpen }: UpdateUserWallet_Props) {
  const { i18n, t } = useTranslation();

  return (
    <Dialog
      title={t("tableActions.updateUserWallet.title")}
      description={
        t("tableActions.updateUserWallet.description.1") +
        formatNumber(i18n.language as Language, id, "decimal") +
        (currency == "SAR" ? t("tableActions.updateUserWallet.description.2") : t("tableActions.updateUserWallet.description.3"))
      }
      toolTip={t("tableActions.updateUserWallet.tooltip")}
      trigger={
        <Button size="icon" icon={BanknoteIcon} disabled={disabled}>
          {t("tableActions.updateUserWallet.tooltip")}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </Dialog>
  );
}
