import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface LoadingSpinner_Props {
  className?: string;
  iconClassName?: string;
  loadingText?: ReactNode;
  isFullPage?: boolean;
}

export default function LoadingSpinner({ className, iconClassName, loadingText, isFullPage }: LoadingSpinner_Props) {
  const { t } = useTranslation();

  return (
    <span className={cn("flex items-center justify-center gap-2 capitalize", isFullPage ? "h-svh text-xl" : "", className)}>
      <LoaderCircleIcon className={cn("animate-spin", iconClassName)} />
      {loadingText || <span className="sr-only">{t("keyWords.loading")}</span>}
    </span>
  );
}
