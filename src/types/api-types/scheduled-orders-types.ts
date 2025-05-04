import { OrderBase, OrderItemBase, Pagination, PaymentMethod } from "@/types/api-types";

export type ScheduledOrderStatus =
  | "Pending"
  | "AssignedToBranch"
  | "Delivered"
  | "Canceled"
  | "HasIssue"
  | "Rejected"
  | "RequestedToSpecialCancel"
  | "FullyPrepared"
  | "DeliveredConfirmed"
  | "IssueReported";

export interface ScheduledOrder extends OrderBase {
  status: ScheduledOrderStatus;
  totalDiscount: number;
  priceBeforeDiscount: number;
  paidAmount: number;
  remainingAmount: number;
  isFullPaid: boolean;
  isSpecial: false;
  bookingItems: ScheduledOrderItem[];
  branchId?: number;
  updatedAt?: Date;
}

export interface ScheduledOrderItem extends OrderItemBase {
  preparedQuantity: number;
}

export interface GetScheduledOrders_Response extends Pagination {
  items: ScheduledOrder[];
}

export interface AssignScheduledOrderToStore_Request {
  bookingId: number;
  branchId: number;
}

export interface RejectScheduledOrder_Request {
  bookingId: number;
  note: string;
}

export interface ConfirmScheduledOrderCancelation_Request {
  id: number;
}

export interface CancelScheduledOrder_Request {
  bookingId: number;
  reason: string;
  refundAmount: number;
}

export interface SetScheduledOrderAsCODPaid_Request {
  bookingId: number;
  notes?: string;
}

export interface PrepareScheduledOrder_Request {
  bookingId: number;
  preparedProducts: { productId: number; quantity: number }[];
}

export interface PayForScheduledOrder_Request {
  bookingId: number;
  amount: number;
  paymentMethod: PaymentMethod;
}
