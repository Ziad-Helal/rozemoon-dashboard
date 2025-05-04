import { UpdateFastOrderStatus_Form } from "@/components/forms";
import { CashedOnDelivery, DownloadDocuments, Expand_FastOrder, UpdateFastOrder_Status } from "@/components/table-actions";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useGetFastOrderInvoice, useSetFastOrderAsCODPaid } from "@/queries";
import { AuthenticatedUser, FastOrder } from "@/types/api-types";
import { useEffect, useState } from "react";

export interface Actions_Props extends FastOrder {}

export default function Actions(fastOrder: Actions_Props) {
  const { id, status } = fastOrder;
  const [documents, setDocuments] = useState<string[]>([]);
  const { refetch: getInvoice, isFetching: isGettingInvoice } = useGetFastOrderInvoice({ id });
  const { mutateAsync: setAsCODed, isPending: isSettingAsCODed } = useSetFastOrderAsCODPaid();
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
      <DownloadDocuments item="invoice" documents={documents} onOpen={downloadDocuments} isLoading={isGettingInvoice} disabled={isSettingAsCODed} />
      {(user?.roles[0] == "StoreKeeper" || user?.roles[0] == "Cashier") && (
        <UpdateFastOrder_Status id={id}>
          <UpdateFastOrderStatus_Form orderId={id} status={status} />
        </UpdateFastOrder_Status>
      )}
      {user?.roles[0] == "Manager" && (status == "Charged" || status == "Delivering" || status == "Delivered" || status == "DeliveredConfirmed") && (
        <CashedOnDelivery item="fast order" id={id} onConfirm={() => setAsCODed({ orderId: id })} isLoading={isSettingAsCODed} disabled={isGettingInvoice} />
      )}
    </>
  );
}
