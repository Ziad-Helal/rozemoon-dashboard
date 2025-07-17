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
  const [updatingToBe, setUpdatingToBe] = useState<Exclude<DamageInvoiceStatus, "pending">>();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { mutateAsync, isPending } = useUpdateDamageInvoiceStatus();
  const userRole = user?.roles[0];

  function updateStatusTo(newStatus: Exclude<DamageInvoiceStatus, "pending">) {
    setUpdatingToBe(newStatus);
    mutateAsync({ requestId: id, newStatus }).finally(() => setUpdatingToBe(undefined));
  }

  return (
    <>
      <ExpandDamageInvoice requestId={id} />
      {(managerStatus == "pending" && userRole == "Manager") || (adminStatus == "pending" && userRole == "Admin") ? (
        <>
          <AuthenticateDamageRequest action="approve" isLoading={isPending && updatingToBe == "approved"} disabled={isPending} onConfirm={() => updateStatusTo("approved")} />
          <AuthenticateDamageRequest action="reject" isLoading={isPending && updatingToBe == "denied"} disabled={isPending} onConfirm={() => updateStatusTo("denied")} />
        </>
      ) : null}
    </>
  );
}
