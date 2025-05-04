import { getRequest } from "@/services/api";
import { ApiError, GetInvoice_Request } from "@/types/api-types";

const endpoints = {
  getFastOrderInvoice: import.meta.env.VITE_API_END_POINT_GET_INVOICE as string,
  getScheduledOrderInvoice: import.meta.env.VITE_API_END_POINT_GET_SCHEDULED_ORDER_INVOICE as string,
};

export function getFastOrderInvoice(requestBody: GetInvoice_Request) {
  return getRequest<Blob, ApiError>(endpoints.getFastOrderInvoice + requestBody.id, { params: requestBody, responseType: "blob" });
}

export function getScheduledOrderInvoice(requestBody: GetInvoice_Request) {
  return getRequest<Blob, ApiError>(endpoints.getScheduledOrderInvoice + requestBody.id, { params: requestBody, responseType: "blob" });
}
