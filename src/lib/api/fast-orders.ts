import { postRequest, putRequest } from "@/services/api";
import {
  ApiError,
  CreateFastOrder_Request,
  CreateFastOrder_Response,
  GetFastOrders_Response,
  Pagination,
  SetFastOrderAsCODPaid_Request,
  UpdateFastOrderStatus_Request,
} from "@/types/api-types";
import { solveAddressTypeIssue } from "./utils";

const endpoints = {
  getAllFastOrders: import.meta.env.VITE_API_END_POINT_GET_ALL_FAST_ORDERS as string,
  getStoreFastOrders: import.meta.env.VITE_API_END_POINT_GET_STORE_FAST_ORDERS as string,
  getMyFastOrders: import.meta.env.VITE_API_END_POINT_GET_MY_FAST_ORDERS as string,
  createFastOrder: import.meta.env.VITE_API_END_POINT_CREATE_FAST_ORDERS as string,
  updateFastOrderStatus: import.meta.env.VITE_API_END_POINT_UPDATE_FAST_ORDER_STATUS as string,
  setFastOrderAsCODPaid: import.meta.env.VITE_API_END_POINT_SET_FAST_ORDER_AS_COD_PAID as string,
};

export function getAllFastOrders(requestBody: Pagination) {
  return postRequest<Pagination, GetFastOrders_Response, ApiError>(endpoints.getAllFastOrders, requestBody).then(solveAddressTypeIssue);
}

export function getStoreFastOrders(requestBody: Pagination) {
  return postRequest<Pagination, GetFastOrders_Response, ApiError>(endpoints.getStoreFastOrders, requestBody).then(solveAddressTypeIssue);
}

export function getMyFastOrders(requestBody: Pagination) {
  return postRequest<Pagination, GetFastOrders_Response, ApiError>(endpoints.getMyFastOrders, requestBody).then(solveAddressTypeIssue);
}

export function createFastOrder(requestBody: CreateFastOrder_Request) {
  return postRequest<CreateFastOrder_Request, CreateFastOrder_Response, ApiError>(endpoints.createFastOrder, requestBody);
}

export function updateFastOrderStatus(requestBody: UpdateFastOrderStatus_Request) {
  return putRequest<UpdateFastOrderStatus_Request, void, ApiError>(endpoints.updateFastOrderStatus, requestBody);
}

export function setFastOrderAsCODPaid(requestBody: SetFastOrderAsCODPaid_Request) {
  return postRequest<SetFastOrderAsCODPaid_Request, void, ApiError>(endpoints.setFastOrderAsCODPaid, requestBody);
}
