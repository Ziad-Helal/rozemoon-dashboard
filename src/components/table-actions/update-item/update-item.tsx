import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { Edit3Icon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

export interface UpdateItem_Props {
  item: "category" | "color" | "product" | "provider" | "store" | "review" | "issue" | "discount" | "setting";
  description: string;
  children: ReactNode;
  disabled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateItem({ item, description, children, disabled, isOpen, setIsOpen }: UpdateItem_Props) {
  const { t } = useTranslation();

  return (
    <Dialog
      title={t("keyWords.update") + " " + t(`keyWords.${item}`)}
      description={description}
      toolTip={t("keyWords.update") + " " + t(`keyWords.${item}`)}
      trigger={
        <Button variant="outline" size="icon" icon={Edit3Icon} disabled={disabled}>
          {t("keyWords.update") + " " + t(`keyWords.${item}`)}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="lg:max-w-screen-md 2xl:max-w-screen-lg"
    >
      {children}
    </Dialog>
  );
}
