import { Dialog, LoadingSpinner } from "@/components/misc";
import { Button } from "@/components/ui";
import { queryKeys, useGetANotification } from "@/queries";
import { useQueryClient } from "@tanstack/react-query";
import { ExpandIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ReadNotification_Props {
  id: number;
  title: string;
}

export default function ReadNotification({ id, title }: ReadNotification_Props) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { data, isFetching, refetch } = useGetANotification({ id });

  return (
    <Dialog
      title={data?.title || title}
      description=""
      toolTip={t("tableActions.expandModal.tooltip.notification")}
      trigger={
        <Button variant="ghost" size="icon" icon={ExpandIcon} onClick={() => refetch()}>
          {t("tableActions.expandModal.tooltip.notification")}
        </Button>
      }
      setIsOpen={(prevState) => {
        if (!prevState) queryClient.invalidateQueries({ queryKey: [queryKeys.myNotifications] });
        return !prevState;
      }}
    >
      {isFetching ? <LoadingSpinner /> : <p>{data?.content}</p>}
    </Dialog>
  );
}
