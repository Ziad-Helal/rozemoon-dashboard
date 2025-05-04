import { getRequest, postRequest, putRequest } from "@/services/api";
import {
  ApiError,
  CreateDiscount_Request,
  CreateDiscount_Response,
  GetAllDiscounts_Response,
  GetDiscountDetails_Request,
  GetDiscountDetails_Response,
  Pagination,
  ToggleDiscountActiveness_Request,
  UpdateDiscount_Request,
} from "@/types/api-types";

const endpoints = {
  createDiscount: import.meta.env.VITE_API_END_POINT_CREATE_DISCOUNT as string,
  getAllDiscounts: import.meta.env.VITE_API_END_POINT_GET_ALL_DISCOUNTS as string,
  toggleDiscountActiveness: import.meta.env.VITE_API_END_POINT_TOGGLE_DISCOUNT_ACTIVE as string,
  updateDiscount: import.meta.env.VITE_API_END_POINT_UPDATE_DISCOUNT as string,
  getDiscountDetails: import.meta.env.VITE_API_END_POINT_GET_DISCOUNT_DETAILS as string,
};

export function createDiscount(requestBody: CreateDiscount_Request) {
  return postRequest<CreateDiscount_Request, CreateDiscount_Response, ApiError>(endpoints.createDiscount, requestBody);
}

export function getAllDiscounts(requestBody: Pagination) {
  return postRequest<Pagination, GetAllDiscounts_Response, ApiError>(endpoints.getAllDiscounts, requestBody);
}

export function toggleDiscountActiveness(requestBody: ToggleDiscountActiveness_Request) {
  return putRequest<ToggleDiscountActiveness_Request, void, ApiError>(endpoints.toggleDiscountActiveness + requestBody.id + "/Active", requestBody);
}

export function updateDiscount(requestBody: UpdateDiscount_Request) {
  return putRequest<UpdateDiscount_Request, void, ApiError>(endpoints.updateDiscount + requestBody.id, requestBody);
}

export function getDiscountDetails(requestBody: GetDiscountDetails_Request) {
  return getRequest<GetDiscountDetails_Response, ApiError>(endpoints.getDiscountDetails + requestBody.id + "/admin", { params: requestBody });
}
