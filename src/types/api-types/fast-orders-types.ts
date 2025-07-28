import type { CreateGuestUser_Request, Currency, OrderBase, OrderItemBase, Pagination, PaymentMethod, ProductPricingType, StockProduct } from "@/types/api-types";

export type FastOrderStatus =
  | "NotPaied"
  | "Pending"
  | "pickedUp"
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
  newIndiPrice: number;
  totalIndiPrice: number;
  totalIndiDiscount: number;
  newMerchPrice: number;
  totalMerchPrice: number;
  totalMerchDiscount: number;
}

export interface FastOrder_Cart {
  priceType: ProductPricingType;
  originalPrice: number;
  discount: number;
  originalIndiPrice: number;
  indiDiscount: number;
  originalMerchPrice: number;
  merchDiscount: number;
  finalPrice: number;
  finalIndiPrice: number;
  finalMerchPrice: number;
  currency: Currency;
  items: FastOrder_CartItem[];
}

export interface CreateFastOrder_Request extends Partial<CreateGuestUser_Request> {
  priceType: ProductPricingType;
  paymentWay: PaymentMethod;
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
  paymentMethod?: PaymentMethod;
}

export interface CreateFastOrder_Response extends CreateFastOrder_Request {}

export interface UpdateFastOrderStatus_Request {
  orderId: number;
  status: FastOrderStatus;
}

export interface CancelFastOrder_Request {
  orderId: number;
}

export interface SetFastOrderAsCODPaid_Request {
  orderId: number;
  notes?: "string";
}
