import { postRequest, putRequest } from "@/services/api";
import {
  ApiError,
  AssignScheduledOrderToStore_Request,
  CancelScheduledOrder_Request,
  ConfirmScheduledOrderCancelation_Request,
  GetScheduledOrders_Response,
  Pagination,
  PayForScheduledOrder_Request,
  PrepareScheduledOrder_Request,
  RejectScheduledOrder_Request,
  SetScheduledOrderAsCODPaid_Request,
} from "@/types/api-types";
import { solveAddressTypeIssue } from "./utils";

const endpoints = {
  getAllScheduledOrders: import.meta.env.VITE_API_END_POINT_GET_ALL_SCHEDULED_ORDERS as string,
  getStoreScheduledOrders: import.meta.env.VITE_API_END_POINT_GET_STORE_SCHEDULED_ORDERS as string,
  assignToStore: import.meta.env.VITE_API_END_POINT_ASSIGN_SCHEDULED_ORDER_TO_STORE as string,
  rejectScheduledOrder: import.meta.env.VITE_API_END_POINT_REJECT_SCHEDULED_ORDER as string,
  confirmScheduledOrderCancelation: import.meta.env.VITE_API_END_POINT_CONFIRM_SCHEDULED_ORDER_CANCELATION as string,
  cancelScheduledOrder: import.meta.env.VITE_API_END_POINT_CANCEL_SCHEDULED_ORDER as string,
  setScheduledOrderAsCODPaid: import.meta.env.VITE_API_END_POINT_SET_SCHEDULED_ORDER_AS_COD_PAID as string,
  addQuantityFromStock: import.meta.env.VITE_API_END_POINT_ADD_QUANTITY_FROM_STOCK as string,
  reduceQuantityToStock: import.meta.env.VITE_API_END_POINT_REDUCE_QUANTITY_TO_STOCK as string,
  payForScheduledOrder: import.meta.env.VITE_API_END_POINT_PAY_FOR_SCHEDULED_ORDER as string,
};

export function getAllScheduledOrders(requestBody: Pagination) {
  return postRequest<Pagination, GetScheduledOrders_Response, ApiError>(endpoints.getAllScheduledOrders, requestBody).then(solveAddressTypeIssue);
}

export function getStoreScheduledOrders(requestBody: Pagination) {
  return postRequest<Pagination, GetScheduledOrders_Response, ApiError>(endpoints.getStoreScheduledOrders, requestBody).then(solveAddressTypeIssue);
}

export function assignToStore(requestBody: AssignScheduledOrderToStore_Request) {
  return postRequest<AssignScheduledOrderToStore_Request, void, ApiError>(endpoints.assignToStore, requestBody);
}

export function rejectScheduledOrder(requestBody: RejectScheduledOrder_Request) {
  return postRequest<RejectScheduledOrder_Request, void, ApiError>(endpoints.rejectScheduledOrder, requestBody);
}

export function confirmScheduledOrderCancelation(requestBody: ConfirmScheduledOrderCancelation_Request) {
  return postRequest<ConfirmScheduledOrderCancelation_Request, void, ApiError>(endpoints.confirmScheduledOrderCancelation + requestBody.id + "/cancel-special", requestBody);
}

export function cancelScheduledOrder(requestBody: CancelScheduledOrder_Request) {
  return postRequest<CancelScheduledOrder_Request, void, ApiError>(endpoints.cancelScheduledOrder, requestBody);
}

export function setScheduledOrderAsCODPaid(requestBody: SetScheduledOrderAsCODPaid_Request) {
  return postRequest<SetScheduledOrderAsCODPaid_Request, void, ApiError>(endpoints.setScheduledOrderAsCODPaid, requestBody);
}

export function prepareScheduledOrder(requestBody: PrepareScheduledOrder_Request, operation: "add" | "reduce") {
  interface RequestBodyType {
    bookingId: number;
    preparedProducts?: { productId: number; quantity: number }[];
    productQuantities?: { productId: number; quantity: number }[];
  }
  const body: RequestBodyType = { bookingId: requestBody.bookingId };
  if (operation == "add") body.preparedProducts = requestBody.preparedProducts;
  else body.productQuantities = requestBody.preparedProducts;
  return putRequest<RequestBodyType, void, ApiError>(operation == "add" ? endpoints.addQuantityFromStock : endpoints.reduceQuantityToStock, body);
}

export function payForScheduledOrder(requestBody: PayForScheduledOrder_Request) {
  return postRequest<PayForScheduledOrder_Request, void, ApiError>(endpoints.payForScheduledOrder, requestBody);
}
