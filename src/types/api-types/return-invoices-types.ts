import type { Language } from "@/localization";
import type { Image, Pagination, ProductType } from "@/types/api-types";

export type ReturnInvoiceStatus = "pending" | "approved" | "denied";

interface ReturnCore {
  orderId?: number;
  bookingId?: number;
  reason?: string;
  returnImages?: Image[];
}

export interface ReturnedItem extends Omit<ReturnCore, "orderId" | "bookingId"> {
  productId: number;
  quantity: number;
}

export interface ReturnedProduct extends Omit<ReturnedItem, "resaon"> {
  id: number;
  requestId: number;
  branchId: number;
  productType: ProductType;
  productName: { [Key in Language]: string };
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
  CreatedAt: Date;
  requestedBy: number;
  ApprovedBy?: number;
  managerStatusUpdatedAt?: Date;
  adminStatusUpdatedAt?: Date;
}

export interface CreateReturnInvoice extends ReturnCore {
  items: ReturnedItem[];
}

export interface UpdateReturnInvoiceStatus {
  requestId: number;
  newStatus: ReturnInvoiceStatus;
}

export interface GetReturnInvoice_Response extends Pagination {
  items: ReturnInvoice[];
}

export interface GetReturnedProducts_Response extends Pagination {
  items: ReturnedProduct[];
}
