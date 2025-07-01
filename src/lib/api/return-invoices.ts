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
  createInvoice: "",
  updateInvoiceStatus: "",
  getInvoice: "",
  getInvoices: "",
  getInvoiceProducts: "",
};

export function createReturnInvoice(requestBody: CreateReturnInvoice) {
  const formData = new FormData();
  for (const key in requestBody) {
    switch (key as keyof CreateReturnInvoice) {
      case "returnImages":
        requestBody.returnImages?.forEach((image) => formData.append("returnImages", image));
        break;
      case "items":
        formData.append(key, requestBody.items as unknown as string | Blob);
        requestBody.items.forEach(({ productId, returnImages }) => {
          returnImages?.forEach((image) => formData.append("itemsJson.returnImages_" + productId, image));
        });
        break;
      default:
        if (requestBody[key as keyof CreateReturnInvoice]) formData.append(key, requestBody[key as keyof CreateReturnInvoice] as string | Blob);
    }
  }

  return postRequest<FormData, number, ApiError>(endpoints.createInvoice, formData);
}

export function updateReturnInvoiceStatus(requestBody: UpdateReturnInvoiceStatus) {
  return patchRequest<UpdateReturnInvoiceStatus, void, ApiError>(endpoints.updateInvoiceStatus, requestBody);
}

export function getReturnInvoice(requestBody: GetReturnInvoice_Request) {
  return getRequest<GetReturnInvoice_Response, ApiError>(endpoints.getInvoice, { params: requestBody });
}

export function getReturnInvoices(requestBody: Pagination) {
  return postRequest<Pagination, GetReturnInvoices_Response, ApiError>(endpoints.getInvoices, requestBody);
}

export function getReturnInvoiceProducts(requestBody: Pagination) {
  return postRequest<Pagination, GetReturnedProducts_Response, ApiError>(endpoints.getInvoiceProducts, requestBody);
}
