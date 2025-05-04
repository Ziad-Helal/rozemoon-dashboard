import { Currency, Image, Pagination, ProductType, StockProduct } from "@/types/api-types";

export type StockRefillStatus = "Pending" | "Approved" | "Rejected";

export interface StockRefill {
  id: number;
  status: StockRefillStatus;
  statusLocalized: string;
  branchId: number;
  providerId: number;
  createdAt: Date;
  updatedAt: Date;
  currency: Currency;
  finalPrice: number;
  refillItems: StockRefillItem[];
}

export interface StockRefillItem {
  id: number;
  stockRefillRequestId: number;
  quantity: number;
  purchasePrice: number;
  productType: ProductType;
  name: string;
  productDescription: string;
  productId: number;
  categoryId: number;
  colorId: number;
  price_SAR: number;
  price_USD: number;
  flowersPerStem: number;
  stemPerBunch: number;
  stemSizePerCM: number;
  vaseLifePerDay: number;
}

export interface GetStock_Response extends Pagination {
  items: StockProduct[];
}

export interface GetStockRefills_Response extends Pagination {
  items: StockRefill[];
}

export interface Refill_Cart {
  totalPrice: number;
  items: Refill_CartItem[];
}

export interface Refill_CartItem {
  id: number;
  productId: number;
  productType: ProductType;
  name: string;
  images: Image[];
  purchasePrice: number;
  quantity: number;
  cartQuantity: number;
}

export interface CreateStockRefill_Request {
  providerId: number;
  currency: Currency;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}

export interface AuthenticateStockRefill_Request {
  id: number;
}
