import { OrderBase, OrderItemBase, Pagination, PaymentMethod, StockProduct } from "@/types/api-types";

export type FastOrderStatus =
  | "NotPaied"
  | "Pending"
  | "Charged"
  | "Delivering"
  | "Delivered"
  | "Cancelled"
  | "Returned"
  | "PartiallyReturned"
  | "HasIssue"
  | "DeliveredConfirmed"
  | "IssueReported";

export interface FastOrder extends OrderBase {
  status: FastOrderStatus;
  branchId: number;
  totalPriceBeforeDiscount: number;
  totalDiscountAmount: number;
  extraDiscountAmount: number;
  taxAmount: number;
  paymentMethod: PaymentMethod;
  paymentMethodLocalized: string;
  isDelivered: boolean;
  orderItems: FastOrderItem[];
}

export interface FastOrderItem extends OrderItemBase {}

export interface GetFastOrders_Response extends Pagination {
  items: FastOrder[];
}

export interface FastOrder_CartItem extends StockProduct {
  cartQuantity: number;
  newPrice: number;
  totalPrice: number;
  totalDiscount: number;
}

export interface FastOrder_Cart {
  originalPrice: number;
  discount: number;
  finalPrice: number;
  items: FastOrder_CartItem[];
}

export interface CreateFastOrder_Request {
  paymentWay: string;
  status: string;
  currency: string;
  deliveryAddress: string;
  deliveryDate: Date;
  branchId: number;
  orderItems: {
    productId: number;
    quantity: number;
  }[];
  extraDiscountAmount?: number;
  taxAmount?: number;
  note?: string;
}

export interface CreateFastOrder_Response extends CreateFastOrder_Request {}

export interface UpdateFastOrderStatus_Request {
  orderId: number;
  status: FastOrderStatus;
}

export interface SetFastOrderAsCODPaid_Request {
  orderId: number;
  notes?: "string";
}
