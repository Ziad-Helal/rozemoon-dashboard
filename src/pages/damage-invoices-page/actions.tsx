import { AuthenticateDamageRequest, ExpandDamageInvoice } from "@/components/table-actions";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useUpdateDamageInvoiceStatus } from "@/queries";
import { AuthenticatedUser, DamageInvoiceStatus } from "@/types/api-types";
import { useState } from "react";

export interface Actions_Props {
  id: number;
  managerStatus: DamageInvoiceStatus;
  adminStatus: DamageInvoiceStatus;
}

export default function Actions({ id, managerStatus, adminStatus }: Actions_Props) {
  const [updatingToBe, setUpdatingToBe] = useState<Exclude<DamageInvoiceStatus, "Pending">>();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { mutateAsync, isPending } = useUpdateDamageInvoiceStatus();
  const useRole = user?.roles[0];

  function updateStatusTo(newStatus: Exclude<DamageInvoiceStatus, "Pending">) {
    setUpdatingToBe(newStatus);
    mutateAsync({ requestId: id, newStatus }).finally(() => setUpdatingToBe(undefined));
  }

  return (
    <>
      <ExpandDamageInvoice requestId={id} />
      {(managerStatus == "Pending" && useRole == "Manager") || (adminStatus == "Pending" && useRole == "Admin") ? (
        <>
          <AuthenticateDamageRequest action="approve" isLoading={isPending && updatingToBe == "Approved"} disabled={isPending} onConfirm={() => updateStatusTo("Approved")} />
          <AuthenticateDamageRequest action="reject" isLoading={isPending && updatingToBe == "Denied"} disabled={isPending} onConfirm={() => updateStatusTo("Denied")} />
        </>
      ) : null}
    </>
  );
}
