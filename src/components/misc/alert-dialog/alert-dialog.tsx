import {
  AlertDialog as Alert,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { forwardRef, ReactNode } from "react";
import { ToolTip } from "@/components";
import { useTranslation } from "react-i18next";

interface AlertDialog_Props {
  message: string;
  trigger: ReactNode;
  onConfirm: () => void;
  toolTip?: string;
  submitPhrase?: string;
}

const AlertDialog = forwardRef<HTMLButtonElement, AlertDialog_Props>(({ message, trigger, onConfirm, toolTip, submitPhrase }, ref) => {
  const { t } = useTranslation();

  const triggerComp = toolTip ? (
    <ToolTip
      content={toolTip}
      trigger={
        <AlertDialogTrigger ref={ref} asChild>
          {trigger}
        </AlertDialogTrigger>
      }
    />
  ) : (
    <AlertDialogTrigger ref={ref} asChild>
      {trigger}
    </AlertDialogTrigger>
  );

  return (
    <Alert>
      {triggerComp}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("tableActions.alertTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("keyWords.close")}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{submitPhrase || t("keyWords.continue")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </Alert>
  );
});

export default AlertDialog;
