import { Dialog as DialogComp, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button } from "@/components/ui";
import { Dispatch, forwardRef, ReactNode, SetStateAction } from "react";
import { ToolTip } from "@/components";
import { useTranslation } from "react-i18next";

interface Dialog_Props {
  trigger: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  toolTip?: string;
  className?: string;
}

const Dialog = forwardRef<HTMLButtonElement, Dialog_Props>(({ trigger, title, description, children, isOpen, setIsOpen, toolTip, className }, ref) => {
  const { t } = useTranslation();

  const triggerComp = toolTip ? (
    <ToolTip
      content={toolTip}
      trigger={
        <DialogTrigger ref={ref} asChild>
          {trigger}
        </DialogTrigger>
      }
    />
  ) : (
    <DialogTrigger ref={ref} asChild>
      {trigger}
    </DialogTrigger>
  );

  return (
    <DialogComp open={isOpen} onOpenChange={setIsOpen}>
      {triggerComp}
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              {t("keyWords.close")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogComp>
  );
});

export default Dialog;
