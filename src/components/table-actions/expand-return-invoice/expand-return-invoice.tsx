import { Dialog, LoadingSpinner } from "@/components/misc";
import { Button } from "@/components/ui";
import { useEffectAfterMount } from "@/hooks/misc";
import { formatDate, formatNumber, type Language } from "@/localization";
import { useGetReturnInvoice } from "@/queries";
import { ExpandIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ReturnedProduct_Card, ReturnFeedback } from "./components";

interface ExpandReturnInvoice_Props {
  requestId: number;
}

export default function ExpandReturnInvoice({ requestId }: ExpandReturnInvoice_Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { data, isFetching, refetch } = useGetReturnInvoice({ requestId });

  useEffectAfterMount(() => {
    if (isOpen) refetch();
  }, [isOpen]);

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`${t("keyWords.return invoice")} #${formatNumber(i18n.language as Language, requestId, "decimal")}`}
      description={`${t("dataTable.createdAt")}: ${data ? formatDate(i18n.language as Language, data.createdAt) : null}`}
      className="lg:max-w-screen-md"
      toolTip={t("tableActions.expandModal.tooltip.returnInvoice")}
      trigger={
        <Button variant="ghost" size="icon" icon={ExpandIcon}>
          {t("tableActions.expandModal.tooltip.order")}
        </Button>
      }
    >
      <div className="space-y-2">
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <>
            <ReturnFeedback reason={data?.reason} returnImages={data?.returnImages} />
            <div className="space-y-2">
              {data?.returnItems.map((product) => (
                <ReturnedProduct_Card key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
