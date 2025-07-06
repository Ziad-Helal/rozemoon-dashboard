import { getRequest, patchRequest, postRequest } from "@/services/api";
import type {
  ApiError,
  CreateReturnInvoice,
  GetReturnedProducts_Response,
  GetReturnInvoice_Request,
  GetReturnInvoice_Response,
  GetReturnInvoices_Response,
  Pagination,
  UpdateReturnInvoiceStatus,
} from "@/types/api-types";

const endpoints = {
  createInvoice: import.meta.env.VITE_API_END_POINT_CREATE_RETURN_INVOICE as string,
  updateInvoiceStatus: import.meta.env.VITE_API_END_POINT_UPDATE_RETURN_INVOICE_STATUS as string,
  getInvoice: import.meta.env.VITE_API_END_POINT_GET_RETURN_INVOICE as string,
  getInvoices: import.meta.env.VITE_API_END_POINT_GET_RETURN_INVOICES as string,
  getInvoiceProducts: import.meta.env.VITE_API_END_POINT_GET_RETURNED_PRODUCTS as string,
};

export function createReturnInvoice(requestBody: CreateReturnInvoice) {
  const formData = new FormData();
  for (const key in requestBody) {
    switch (key as keyof CreateReturnInvoice) {
      case "returnImages":
        requestBody.returnImages?.forEach((image) => formData.append("returnImages", image));
        break;
      case "items":
        requestBody.items.forEach((item) => {
          item.returnImages?.forEach((image) => formData.append("itemImages_" + item.productId, image));
          delete item.returnImages;
        });
        formData.append("itemsJson", JSON.stringify(requestBody.items));
        break;
      default:
        if (requestBody[key as keyof CreateReturnInvoice]) formData.append(key, requestBody[key as keyof CreateReturnInvoice] as string | Blob);
    }
  }

  return postRequest<FormData, number, ApiError>(endpoints.createInvoice, formData, { headers: { "Content-Type": "multipart/form-data" } });
}

export function updateReturnInvoiceStatus(requestBody: UpdateReturnInvoiceStatus) {
  return patchRequest<UpdateReturnInvoiceStatus, void, ApiError>(endpoints.updateInvoiceStatus, requestBody);
}

export function getReturnInvoice(requestBody: GetReturnInvoice_Request) {
  return getRequest<GetReturnInvoice_Response, ApiError>(endpoints.getInvoice + requestBody.requestId, { params: requestBody });
}

export function getReturnInvoices(requestBody: Pagination) {
  return postRequest<Pagination, GetReturnInvoices_Response, ApiError>(endpoints.getInvoices, requestBody);
}

export function getReturnInvoiceProducts(requestBody: Pagination) {
  return postRequest<Pagination, GetReturnedProducts_Response, ApiError>(endpoints.getInvoiceProducts, requestBody);
}
