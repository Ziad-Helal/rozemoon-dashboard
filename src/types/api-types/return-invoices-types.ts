import type { Pagination, ProductType } from "@/types/api-types";

export type ReturnInvoiceStatus = "Pending" | "Approved" | "Denied";
export type OrderType = "order" | "booking";

interface ReturnCore {
  orderId?: number;
  bookingId?: number;
  reason?: string;
  returnImages?: string[];
}

export interface ReturnedItem extends Omit<ReturnCore, "orderId" | "bookingId"> {
  productId: number;
  quantity: number;
}

export interface ReturnedProduct extends Omit<ReturnedItem, "reason"> {
  id: number;
  requestId: number;
  branchId: number;
  productType: ProductType;
  productName: string;
  createdAt: Date;
  price?: number;
  standardPriceSAR?: number;
  standardPriceUSD?: number;
  indiPriceSAR?: number;
  indiPriceUSD?: number;
  merchPriceSAR?: number;
  merchPriceUSD?: number;
  updatedAt?: Date;
  returnReason?: string;
}

export interface ReturnInvoice extends ReturnCore {
  id: number;
  customerId: number;
  branchId: number;
  managerStatus: ReturnInvoiceStatus;
  adminStatus: ReturnInvoiceStatus;
  createdAt: Date;
  requestedBy: number;
  approvedBy?: number;
  managerStatusUpdatedAt?: Date;
  adminStatusUpdatedAt?: Date;
}

export interface CreateReturnInvoice extends Omit<ReturnCore, "returnImages"> {
  orderType: OrderType;
  items: CreateReturnInvoiceItem[];
  returnImages?: File[];
}

export interface UpdateReturnInvoiceStatus {
  requestId: number;
  newStatus: ReturnInvoiceStatus;
}

export interface GetReturnInvoices_Response extends Pagination {
  items: ReturnInvoice[];
}

export interface GetReturnedProducts_Response extends Pagination {
  items: ReturnedProduct[];
}

export interface GetReturnInvoice_Request {
  requestId: number;
}

export interface GetReturnInvoice_Response extends ReturnInvoice {
  returnItems: ReturnedProduct[];
}

export interface CreateReturnInvoiceItem extends Omit<ReturnedItem, "reason" | "returnImages"> {
  returnReason?: string;
  returnImages?: File[];
}
