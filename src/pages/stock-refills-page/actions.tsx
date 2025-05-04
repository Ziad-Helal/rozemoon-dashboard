import { AuthenticateStockRefillRequest, ExpandStockRefillRequest } from "@/components/table-actions";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useApproveStockRefill, useRejectStockRefill } from "@/queries";
import { AuthenticatedUser, StockRefill } from "@/types/api-types";

export interface Actions_Props extends StockRefill {}

export default function Actions(order: Actions_Props) {
  const { id, status } = order;
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { mutateAsync: approveOrder, isPending: isApprovingOrder } = useApproveStockRefill();
  const { mutateAsync: rejectOrder, isPending: isRejectingOrder } = useRejectStockRefill();

  return (
    <>
      <ExpandStockRefillRequest order={order} />
      {user?.roles[0] == "Manager" && status == "Pending" && (
        <>
          <AuthenticateStockRefillRequest action="approve" onConfirm={() => approveOrder({ id })} isLoading={isApprovingOrder} disabled={isRejectingOrder} />
          <AuthenticateStockRefillRequest action="reject" onConfirm={() => rejectOrder({ id })} isLoading={isRejectingOrder} disabled={isApprovingOrder} />
        </>
      )}
    </>
  );
}
