import { Dialog, LoadingSpinner } from "@/components/misc";
import { Button } from "@/components/ui";
import { useEffectAfterMount } from "@/hooks/misc";
import { formatDate, formatNumber, type Language } from "@/localization";
import { useGetDamageInvoice } from "@/queries";
import { ExpandIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DamagedProduct_Card, DamageFeedback } from "./components";

interface ExpandDamageInvoice_Props {
  requestId: number;
}

export default function ExpandDamageInvoice({ requestId }: ExpandDamageInvoice_Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { data, isFetching, refetch } = useGetDamageInvoice({ requestId });

  useEffectAfterMount(() => {
    if (isOpen) refetch();
  }, [isOpen]);

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`${t("keyWords.damage invoice")} #${formatNumber(i18n.language as Language, requestId, "decimal")}`}
      description={`${t("dataTable.createdAt")}: ${data ? formatDate(i18n.language as Language, data.createdAt) : null}`}
      className="lg:max-w-screen-md"
      toolTip={t("tableActions.expandModal.tooltip.damageInvoice")}
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
            <DamageFeedback reason={data?.reason} damageImages={data?.damagedImages} />
            <div className="space-y-2">
              {data?.damageItems.map((product) => (
                <DamagedProduct_Card key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
