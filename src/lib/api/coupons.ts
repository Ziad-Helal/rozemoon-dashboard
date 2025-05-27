import { getRequest, patchRequest, postRequest } from "@/services/api";
import { ApiError, CreateCoupon_Request, GetAllCoupons_Response, GetCouponDetails_Request, GetCouponDetails_Response, Pagination, UpdateCoupon_Request } from "@/types/api-types";

const endpoints = {
  createCoupon: import.meta.env.VITE_API_END_POINT_CREATE_COUPON as string,
  getAllCoupons: import.meta.env.VITE_API_END_POINT_GET_ALL_COUPONS as string,
  updateCoupon: import.meta.env.VITE_API_END_POINT_UPDATE_COUPON as string,
  getCouponDetails: import.meta.env.VITE_API_END_POINT_GET_COUPON_DETAILS as string,
};

export function createCoupon(requestBody: CreateCoupon_Request) {
  return postRequest<CreateCoupon_Request, void, ApiError>(endpoints.createCoupon, requestBody);
}

export function getAllCoupons(requestBody: Pagination) {
  return postRequest<Pagination, GetAllCoupons_Response, ApiError>(endpoints.getAllCoupons, requestBody);
}

export function updateCoupon(requestBody: UpdateCoupon_Request) {
  return patchRequest<UpdateCoupon_Request, void, ApiError>(endpoints.updateCoupon + requestBody.id, requestBody, { params: { couponId: requestBody.id } });
}

export function getCouponDetails(requestBody: GetCouponDetails_Request) {
  return getRequest<GetCouponDetails_Response, ApiError>(endpoints.getCouponDetails + requestBody.id, { params: requestBody });
}
