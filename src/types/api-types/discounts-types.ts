import { Name_Localization, Pagination } from "@/types/api-types";

export interface DiscountBase {
  id: number;
  name: string;
  percentage: number;
}

export interface Discount extends DiscountBase {
  isActive: boolean;
  createdAt: Date;
}

export interface GetAllDiscounts_Response extends Pagination {
  items: Discount[];
}

export interface CreateDiscount_Request extends Name_Localization {
  percentage: number;
  isActive: boolean;
}

export interface CreateDiscount_Response extends CreateDiscount_Request {}

export interface ToggleDiscountActiveness_Request {
  id: number;
  isActive: boolean;
}

export interface UpdateDiscount_Request extends CreateDiscount_Request {
  id: number;
}

export interface GetDiscountDetails_Request {
  id: number;
}

export interface GetDiscountDetails_Response extends UpdateDiscount_Request {
  id: number;
  nameLocalized: string;
}
