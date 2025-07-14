import type { Pagination, ProductType } from "@/types/api-types";

export type DamageInvoiceStatus = "Pending" | "Approved" | "Denied";
export type OrderType = "order" | "booking";

interface DamageCore {
  orderId?: number;
  bookingId?: number;
  reason?: string;
  damagedImages?: string[];
}

export interface DamagedItem extends Omit<DamageCore, "orderId" | "bookingId"> {
  productId: number;
  quantity: number;
}

export interface DamagedProduct extends Omit<DamagedItem, "reason"> {
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
  damageDescription?: string;
}

export interface DamageInvoice extends DamageCore {
  id: number;
  // customerId: number;
  branchId: number;
  managerStatus: DamageInvoiceStatus;
  adminStatus: DamageInvoiceStatus;
  createdAt: Date;
  requestedBy: number;
  ApprovedBy?: number;
  managerStatusUpdatedAt?: Date;
  adminStatusUpdatedAt?: Date;
}

export interface CreateDamageInvoice extends Omit<DamageCore, "damagedImages"> {
  orderType: OrderType;
  items: DamagedItem[];
  damagedImages?: File[];
}

export interface UpdateDamageInvoiceStatus {
  requestId: number;
  newStatus: DamageInvoiceStatus;
}

export interface GetDamageInvoices_Response extends Pagination {
  items: DamageInvoice[];
}

export interface GetDamagedProducts_Response extends Pagination {
  items: DamagedProduct[];
}

export interface GetDamageInvoice_Request {
  requestId: number;
}

export interface GetDamageInvoice_Response extends DamageInvoice {
  damageItems: DamagedProduct[];
}

export interface CreateDamageInvoiceItem extends Omit<DamagedItem, "reason" | "damagedImages"> {
  returnReason?: string;
  returnImages?: File[];
}
