import { Pagination } from "./pagination-types";

export interface CouponBase {
  id: number;
  couponString: string;
  percentage: number;
  isForBooking: boolean;
  isForOrder: boolean;
  isActivated: boolean;
}

export interface Coupon extends CouponBase {
  maxAmountSar?: number;
  maxAmountUsd?: number;
  expiryDateTime?: Date;
  maxNumOfRedeemsPerUser?: number;
  maxRedeems?: number;
  userIds?: number[];
  bannedIds?: number[];
  countries?: string[];
}

export interface CreateCoupon_Request extends Omit<Coupon, "id"> {}

export interface UpdateCoupon_Request extends Coupon {}

export interface GetCouponDetails_Request {
  id: number;
}

export interface GetCouponDetails_Response extends Coupon {}

export interface GetAllCoupons_Response extends Pagination {
  items: Coupon[];
}
