import { getRequest, patchRequest, postRequest } from "@/services/api";
import type {
  ApiError,
  CreateDamageInvoice,
  GetDamagedProducts_Response,
  GetDamageInvoice_Request,
  GetDamageInvoice_Response,
  GetDamageInvoices_Response,
  Pagination,
  UpdateDamageInvoiceStatus,
} from "@/types/api-types";

const endpoints = {
  createInvoice: import.meta.env.VITE_API_END_POINT_CREATE_DAMAGE_INVOICE as string,
  updateInvoiceStatus: import.meta.env.VITE_API_END_POINT_UPDATE_DAMAGE_INVOICE_STATUS as string,
  getInvoice: import.meta.env.VITE_API_END_POINT_GET_DAMAGE_INVOICE as string,
  getInvoices: import.meta.env.VITE_API_END_POINT_GET_DAMAGE_INVOICES as string,
  getInvoiceProducts: import.meta.env.VITE_API_END_POINT_GET_DAMAGED_PRODUCTS as string,
};

export function createDamageInvoice(requestBody: CreateDamageInvoice) {
  const formData = new FormData();
  for (const key in requestBody) {
    switch (key as keyof CreateDamageInvoice) {
      case "damagedImages":
        requestBody.damagedImages?.forEach((image) => formData.append("damagedImages", image));
        break;
      case "items":
        requestBody.items.forEach((item) => {
          item.damageImages?.forEach((image) => formData.append("itemImages_" + item.productId, image));
          item.quantity = item.cartQuantity ?? item.quantity;
          delete item.damageImages;
        });
        formData.append("itemsJson", JSON.stringify(requestBody.items));
        break;
      default:
        if (requestBody[key as keyof CreateDamageInvoice]) formData.append(key, requestBody[key as keyof CreateDamageInvoice] as string | Blob);
    }
  }

  return postRequest<FormData, number, ApiError>(endpoints.createInvoice, formData, { headers: { "Content-Type": "multipart/form-data" } });
}

export function updateDamageInvoiceStatus(requestBody: UpdateDamageInvoiceStatus) {
  return patchRequest<UpdateDamageInvoiceStatus, void, ApiError>(endpoints.updateInvoiceStatus, requestBody);
}

export function getDamageInvoice(requestBody: GetDamageInvoice_Request) {
  return getRequest<GetDamageInvoice_Response, ApiError>(endpoints.getInvoice + requestBody.requestId, { params: requestBody });
}

export function getDamageInvoices(requestBody: Pagination) {
  return postRequest<Pagination, GetDamageInvoices_Response, ApiError>(endpoints.getInvoices, requestBody);
}

export function getDamageInvoiceProducts(requestBody: Pagination) {
  return postRequest<Pagination, GetDamagedProducts_Response, ApiError>(endpoints.getInvoiceProducts, requestBody);
}
