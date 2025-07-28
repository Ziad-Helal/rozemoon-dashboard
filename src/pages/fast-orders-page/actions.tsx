import { ToolTip } from "@/components";
import { UpdateFastOrderStatus_Form } from "@/components/forms";
import { CancelFastOrder, DownloadDocuments, Expand_FastOrder, UpdateFastOrder_Status } from "@/components/table-actions";
import { Button } from "@/components/ui";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useCancelFastOrderByManager, useGetFastOrderInvoice } from "@/queries";
import { routes } from "@/routes";
import { AuthenticatedUser, FastOrder } from "@/types/api-types";
import { ListRestartIcon, ListXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export interface Actions_Props extends FastOrder {}

export default function Actions(fastOrder: Actions_Props) {
  const { t } = useTranslation();
  const { id, status } = fastOrder;
  const [documents, setDocuments] = useState<string[]>([]);
  const { refetch: getInvoice, isFetching: isGettingInvoice } = useGetFastOrderInvoice({ id });
  const { mutate: cancelOrderByManager, isPending: isCancellingOrderByManger } = useCancelFastOrderByManager();
  // const { mutateAsync: setAsCODed, isPending: isSettingAsCODed } = useSetFastOrderAsCODPaid();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);

  async function downloadDocuments() {
    if (documents.length == 0) {
      const files = await getInvoice();
      if (files.data) setDocuments(files.data.map((file) => URL.createObjectURL(file)));
    }
  }

  useEffect(() => {
    return () => {
      documents.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <>
      <Expand_FastOrder fastOrder={fastOrder} />
      <DownloadDocuments item="invoice" documents={documents} onOpen={downloadDocuments} isLoading={isGettingInvoice} disabled={false} />
      {user?.roles[0] == "Manager" &&
        fastOrder.status != "Delivered" &&
        fastOrder.status != "Cancelled" &&
        fastOrder.status != "Returned" &&
        fastOrder.status != "PartiallyReturned" &&
        fastOrder.status != "DeliveredConfirmed" &&
        fastOrder.status != "IssueReported" &&
        fastOrder.status != "pickedUp" && (
          <CancelFastOrder id={fastOrder.id} onConfirm={() => cancelOrderByManager({ orderId: fastOrder.id })} isLoading={isCancellingOrderByManger} />
        )}
      {(user?.roles[0] == "StoreKeeper" || user?.roles[0] == "Cashier") && (
        <UpdateFastOrder_Status id={id}>
          <UpdateFastOrderStatus_Form orderId={id} status={status} />
        </UpdateFastOrder_Status>
      )}
      {user?.roles[0] == "Cashier" && (
        <>
          <Link to={`${routes.createReturnInvoice}?id=${fastOrder.id}`}>
            <ToolTip
              content={t("tableActions.createReturnInvoice.tooltip")}
              trigger={
                <Button size="icon" variant="destructive" icon={ListRestartIcon}>
                  {t("tableActions.createReturnInvoice.tooltip")}
                </Button>
              }
            />
          </Link>
          <Link to={`${routes.createDamageInvoice}?id=${fastOrder.id}`}>
            <ToolTip
              content={t("tableActions.createDamageInvoice.tooltip")}
              trigger={
                <Button size="icon" variant="destructive" icon={ListXIcon}>
                  {t("tableActions.createDamageInvoice.tooltip")}
                </Button>
              }
            />
          </Link>
        </>
      )}
      {/* {user?.roles[0] == "Manager" && (status == "Charged" || status == "Delivering" || status == "Delivered" || status == "DeliveredConfirmed") && (
        <CashedOnDelivery item="fast order" id={id} onConfirm={() => setAsCODed({ orderId: id })} isLoading={isSettingAsCODed} disabled={isGettingInvoice} />
      )} */}
    </>
  );
}
