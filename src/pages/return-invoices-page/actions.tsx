import { AuthenticateReturnRequest, ExpandReturnInvoice } from "@/components/table-actions";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useUpdateReturnInvoiceStatus } from "@/queries";
import { AuthenticatedUser, ReturnInvoiceStatus } from "@/types/api-types";
import { useState } from "react";

export interface Actions_Props {
  id: number;
  managerStatus: ReturnInvoiceStatus;
  adminStatus: ReturnInvoiceStatus;
}

export default function Actions({ id, managerStatus, adminStatus }: Actions_Props) {
  const [updatingToBe, setUpdatingToBe] = useState<Exclude<ReturnInvoiceStatus, "Pending">>();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { mutateAsync, isPending } = useUpdateReturnInvoiceStatus();
  const useRole = user?.roles[0];

  function updateStatusTo(newStatus: Exclude<ReturnInvoiceStatus, "Pending">) {
    setUpdatingToBe(newStatus);
    mutateAsync({ requestId: id, newStatus }).finally(() => setUpdatingToBe(undefined));
  }

  return (
    <>
      <ExpandReturnInvoice requestId={id} />
      {(managerStatus == "Pending" && useRole == "Manager") || (adminStatus == "Pending" && useRole == "Admin") ? (
        <>
          <AuthenticateReturnRequest action="approve" isLoading={isPending && updatingToBe == "Approved"} disabled={isPending} onConfirm={() => updateStatusTo("Approved")} />
          <AuthenticateReturnRequest action="reject" isLoading={isPending && updatingToBe == "Denied"} disabled={isPending} onConfirm={() => updateStatusTo("Denied")} />
        </>
      ) : null}
    </>
  );
}
