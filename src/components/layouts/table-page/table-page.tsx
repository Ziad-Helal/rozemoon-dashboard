import { ToolTip } from "@/components/misc";
import { Button } from "@/components/ui";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { RotateCwIcon } from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface TablePage_Props {
  heading: string;
  children: ReactNode;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
  isFetching: boolean;
  quickActions?: ReactNode;
}

export default function TablePage({ heading, children, refetch, isFetching, quickActions }: TablePage_Props) {
  const { t } = useTranslation();

  return (
    <section>
      <header className="flex gap-3 items-center justify-between mb-3 lg:mb-6">
        <h2 className="capitalize font-medium text-2xl lg:text-4xl">{heading}</h2>
        <div className="flex items-center gap-2">
          {quickActions}
          <ToolTip
            content={t("tablePages.refetch")}
            trigger={
              <Button variant="ghost" size="icon" icon={RotateCwIcon} onClick={() => refetch()} isLoading={isFetching}>
                {t("tablePages.refetch")}
              </Button>
            }
          />
        </div>
      </header>
      {children}
    </section>
  );
}
