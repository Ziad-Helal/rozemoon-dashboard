import { AuthenticateReturnRequest } from "@/components/table-actions";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useApproveReturnByAdmin, useApproveReturnByManager, useRejectReturnByAdmin, useRejectReturnByManager } from "@/queries";
import { AuthenticatedUser, ReturnRequestStatus } from "@/types/api-types";

export interface Actions_Props {
  id: number;
  status: ReturnRequestStatus;
  statusFromAdmin: ReturnRequestStatus;
}

export default function Actions({ id, status, statusFromAdmin }: Actions_Props) {
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { mutateAsync: approveReturnByManager, isPending: isApprovingReturnByManager } = useApproveReturnByManager();
  const { mutateAsync: rejectReturnByManager, isPending: isRejectingReturnByManager } = useRejectReturnByManager();
  const { mutateAsync: approveReturnByAdmin, isPending: isApprovingReturnByAdmin } = useApproveReturnByAdmin();
  const { mutateAsync: rejectReturnByAdmin, isPending: isRejectingReturnByAdmin } = useRejectReturnByAdmin();
  const useRole = user?.roles[0];

  return (
    <>
      {(status == "Pending" && useRole == "Manager") || (statusFromAdmin == "Pending" && useRole == "Admin") ? (
        <>
          <AuthenticateReturnRequest
            action="approve"
            isLoading={isApprovingReturnByManager || isApprovingReturnByAdmin}
            disabled={isRejectingReturnByManager || isRejectingReturnByAdmin}
            onConfirm={() => (useRole == "Admin" ? approveReturnByAdmin({ id }) : approveReturnByManager({ id }))}
          />
          <AuthenticateReturnRequest
            action="reject"
            isLoading={isRejectingReturnByManager || isRejectingReturnByAdmin}
            disabled={isApprovingReturnByManager || isApprovingReturnByAdmin}
            onConfirm={() => (useRole == "Admin" ? rejectReturnByAdmin({ id }) : rejectReturnByManager({ id }))}
          />
        </>
      ) : null}
    </>
  );
}
