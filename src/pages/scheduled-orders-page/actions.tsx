import { AssignToStore_Form, CancelScheduledOrder_Form, PayOrder_Form, RejectScheduledOrder_Form } from "@/components/forms";
import {
  AssignOrderToStore,
  CancelScheduledOrder,
  ConfirmScheduledOrderCancelation,
  DownloadDocuments,
  Expand_ScheduledOrder,
  PayOrder,
  RejectScheduledOrder,
} from "@/components/table-actions";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useConfirmScheduledOrderCancelation, useGetScheduledOrderInvoice } from "@/queries";
import { AuthenticatedUser, ScheduledOrder } from "@/types/api-types";
import { useEffect, useState } from "react";

export interface Actions_Props extends ScheduledOrder {}

export default function Actions(scheduledOrder: Actions_Props) {
  const { id, paidAmount, status, isSpecial, remainingAmount } = scheduledOrder;
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [documents, setDocuments] = useState<string[]>([]);
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const userRole = user?.roles[0];
  // const {mutateAsync: payForOrder, isPending: isPayingForOrder} = usePayForScheduledOrder()
  const { mutateAsync: confirmCancelation, isPending: isConfirmingCancleation } = useConfirmScheduledOrderCancelation();
  // const { mutateAsync: setAsCODed, isPending: isSettingAsCODed } = useSetScheduledOrderAsCODPaid();
  const { refetch: getInvoice, isFetching: isGettingInvoice } = useGetScheduledOrderInvoice({ id });

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
      <Expand_ScheduledOrder scheduledOrder={scheduledOrder} />
      <DownloadDocuments item="invoice" documents={documents} onOpen={downloadDocuments} isLoading={isGettingInvoice} disabled={isConfirmingCancleation} />{" "}
      {/* || isSettingAsCODed */}
      {userRole == "Admin" ? (
        <>
          {status == "Pending" ? (
            <>
              <AssignOrderToStore id={id} isOpen={isAssignOpen} setIsOpen={setIsAssignOpen} disabled={isConfirmingCancleation}>
                {/* || isSettingAsCODed */}
                <AssignToStore_Form bookingId={id} />
              </AssignOrderToStore>
              <RejectScheduledOrder bookingId={id} disabled={isConfirmingCancleation}>
                {/* || isSettingAsCODed */}
                <RejectScheduledOrder_Form bookingId={id} />
              </RejectScheduledOrder>
            </>
          ) : null}
          {status == "RequestedToSpecialCancel" ? (
            <ConfirmScheduledOrderCancelation id={id} onConfirm={() => confirmCancelation({ id })} isLoading={isConfirmingCancleation} /> /* isSettingAsCODed */
          ) : !isSpecial && (status == "AssignedToBranch" || status == "HasIssue" || status == "IssueReported" || status == "FullyPrepared") ? (
            <CancelScheduledOrder id={id} isOpen={isCancelOpen} setIsOpen={setIsCancelOpen} disabled={isConfirmingCancleation}>
              {/* || isSettingAsCODed */}
              <CancelScheduledOrder_Form bookingId={id} paidAmount={paidAmount} />
            </CancelScheduledOrder>
          ) : null}
        </>
      ) : userRole == "Manager" ? (
        <>
          {/* {(status == "AssignedToBranch" ||
            status == "FullyPrepared" ||
            status == "HasIssue" ||
            status == "IssueReported" ||
            status == "Delivered" ||
            status == "DeliveredConfirmed") && (
            <CashedOnDelivery item="scheduled order" id={id} onConfirm={() => setAsCODed({ bookingId: id })} isLoading={isSettingAsCODed} disabled={isConfirmingCancleation} />
          )} */}
          {remainingAmount > 0 && status != "Canceled" && status != "Rejected" && (
            <PayOrder item="scheduledOrder" id={id} disabled={isConfirmingCancleation}>
              {/* isSettingAsCODed */}
              <PayOrder_Form bookingId={id} maxAmount={remainingAmount} />
            </PayOrder>
          )}
        </>
      ) : null}
    </>
  );
}
