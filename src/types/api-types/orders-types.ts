import { Address, Currency, FastOrderStatus, Image, ProductType, ScheduledOrderStatus, UserDto } from "@/types/api-types";

export interface OrderBase {
  id: number;
  finalPrice: number;
  currency: Currency;
  status: FastOrderStatus | ScheduledOrderStatus;
  statusLocalized: string;
  deliveryAt: Date;
  deliveryAddress: string | Address;
  note: string;
  createdAt: Date;
  customerId?: number;
  customerDto?: UserDto;
  staffId?: number;
  staffDto?: UserDto;
}

export interface OrderItemBase {
  id: number;
  quantity: number;
  productId: number;
  productName: string;
  price: number;
  discountPercentage: number;
  categoryName: string;
  productImages: Image[];
  productType: ProductType;
}
