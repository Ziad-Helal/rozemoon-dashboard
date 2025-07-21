import type { Pagination, ProductType, StockProduct } from "@/types/api-types";

export type DamageInvoiceStatus = "pending" | "approved" | "denied";
export type OrderType = "order" | "booking";

interface DamageCore {
  orderId?: number;
  bookingId?: number;
  reason?: string;
  damageImages?: string[];
}

export interface DamagedItem extends Omit<DamageCore, "orderId" | "bookingId" | "reason"> {
  productId: number;
  quantity: number;
  damageDescription?: string;
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
  damagedImages?: string[];
  damageDescription?: string;
}

export interface DamageInvoice extends Omit<DamageCore, "damageImages"> {
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
  damagedImages?: string[];
}

export interface DamagedInovoiceItem extends Omit<DamagedItem, "damageImages"> {
  damageImages?: File[];
}

export interface CreateDamageInvoice extends Omit<DamageCore, "damageImages"> {
  items: Damage_CartItem[];
  damagedImages?: File[];
  orderType?: OrderType;
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
  damagedItems: DamagedProduct[];
}

export interface CreateDamageInvoiceItem extends Omit<DamagedItem, "damageDescription" | "damageImages"> {
  damageReason?: string;
  damageImages?: File[];
}

export interface Damage_CartItem extends CreateDamageInvoiceItem, StockProduct {
  cartQuantity: number;
}

export interface Damage_Cart {
  items: Damage_CartItem[];
  reason?: string;
  damagedImages?: File[];
}
