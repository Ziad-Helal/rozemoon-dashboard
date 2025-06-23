import type { Language } from "@/localization";
import type { Image, Pagination, ProductType } from "@/types/api-types";

export type DamageInvoiceStatus = "pending" | "approved" | "denied";

interface DamageCore {
  reason?: string;
  damagedImages?: Image[];
}

export interface DamagedItem extends DamageCore {
  productId: number;
  quantity: number;
}

export interface DamagedProduct extends DamagedItem {
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
  damageDescription?: string;
}

export interface DamageInvoice extends DamageCore {
  id: number;
  branchId: number;
  managerStatus: DamageInvoiceStatus;
  adminStatus: DamageInvoiceStatus;
  CreatedAt: Date;
  orderId?: number;
  requestedBy: number;
  ApprovedBy?: number;
  managerStatusUpdatedAt?: Date;
  adminStatusUpdatedAt?: Date;
}

export interface CreateDamageInvoice extends DamageCore {
  items: DamagedItem[];
  orderId?: number;
}

export interface UpdateDamangeInvoiceStatus {
  requestId: number;
  newStatus: DamageInvoiceStatus;
}

export interface GetDamageInvoices_Response extends Pagination {
  items: DamageInvoice[];
}

export interface GetDamagedProducts_Response extends Pagination {
  items: DamagedProduct[];
}
