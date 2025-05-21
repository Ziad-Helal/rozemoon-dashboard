import { postRequest, putRequest } from "@/services/api";
import { ApiError, AuthenticateStockRefill_Request, CreateStockRefill_Request, GetStock_Response, GetStockRefills_Response, Pagination, UserType } from "@/types/api-types";

const endpoints = {
  getStock: import.meta.env.VITE_API_END_POINT_GET_STOCK as string,
  getStockForAdmin: import.meta.env.VITE_API_END_POINT_GET_STOCK_FOR_ADMIN as string,
  getStockRefill: import.meta.env.VITE_API_END_POINT_GET_STOCK_REFILL as string,
  createStockRefill: import.meta.env.VITE_API_END_POINT_CREATE_STOCK_REFILL as string,
  approveStockRefill: import.meta.env.VITE_API_END_POINT_APPROVE_STOCK_REFILL as string,
  rejectStockRefill: import.meta.env.VITE_API_END_POINT_REJECT_STOCK_REFILL as string,
};

export function getStock(requestBody: Pagination, userRole: UserType) {
  return postRequest<Pagination, GetStock_Response, ApiError>(userRole == "Admin" ? endpoints.getStockForAdmin : endpoints.getStock, requestBody);
}

export function getStockRefills(requestBody: Pagination) {
  return postRequest<Pagination, GetStockRefills_Response, ApiError>(endpoints.getStockRefill, requestBody);
}

export function createStockRefill(requestBody: CreateStockRefill_Request) {
  return postRequest<CreateStockRefill_Request, string, ApiError>(endpoints.createStockRefill, requestBody);
}

export function approveStockRefill(requestBody: AuthenticateStockRefill_Request) {
  return putRequest<AuthenticateStockRefill_Request, string, ApiError>(endpoints.approveStockRefill + requestBody.id, requestBody);
}

export function rejectStockRefill(requestBody: AuthenticateStockRefill_Request) {
  return putRequest<AuthenticateStockRefill_Request, string, ApiError>(endpoints.rejectStockRefill + requestBody.id, requestBody);
}
