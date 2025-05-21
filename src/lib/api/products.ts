import { deleteRequest, getRequest, postRequest, putRequest } from "@/services/api";
import {
  ApplyDiscount_Request,
  ApiError,
  ChangeDiscount_Request,
  CreateProduct_Request,
  CreateProduct_Response,
  GetAllProducts_Response,
  GetProductDetails_Response,
  GetProductsDetails_Request,
  GetPublicProducts_Response,
  Pagination,
  RemoveDiscount_Request,
  ToggleProductVisibility_Request,
  UpdateProduct_Request,
  ApplyDiscount_Response,
  RemoveDiscount_Response,
} from "@/types/api-types";
import { fetchImageAsFile } from "@/lib/utils";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const endpoints = {
  createProduct: import.meta.env.VITE_API_END_POINT_CREATE_PRODUCT as string,
  getAllProducts: import.meta.env.VITE_API_END_POINT_GET_ALL_PRODUCTS as string,
  getPublicProducts: import.meta.env.VITE_API_END_POINT_GET_PUBLIC_PRODUCTS as string,
  toggleProductVisibility: import.meta.env.VITE_API_END_POINT_TOGGLE_PRODUCT_VISIBILITY as string,
  updateProduct: import.meta.env.VITE_API_END_POINT_UPDATE_PRODUCT as string,
  getProductDetails: import.meta.env.VITE_API_END_POINT_GET_PRODUCT_DETAILS as string,
  applyDiscount: import.meta.env.VITE_API_END_POINT_APPLY_DISCOUNT as string,
  removeDiscount: import.meta.env.VITE_API_END_POINT_REMOVE_DISCOUNT as string,
  changeDiscount: import.meta.env.VITE_API_END_POINT_CHANGE_DISCOUNT as string,
};

export function createProduct(requestBody: CreateProduct_Request) {
  const formData = new FormData();

  Object.keys(requestBody).forEach((key) => {
    const value = requestBody[key as keyof CreateProduct_Request];
    if (key !== "files" && value !== undefined) {
      formData.append(key, value as string | Blob);
    }
  });

  requestBody.files?.forEach((file) => {
    formData.append("files", file);
  });

  return postRequest<FormData, CreateProduct_Response, ApiError>(endpoints.createProduct, formData, { headers: { "Content-Type": "multipart/form-data" } });
}

export function getAllProducts(requestBody: Pagination) {
  return postRequest<Pagination, GetAllProducts_Response, ApiError>(endpoints.getAllProducts, requestBody);
}

export function getPublicProducts(requestBody: Pagination) {
  return postRequest<Pagination, GetPublicProducts_Response, ApiError>(endpoints.getPublicProducts, requestBody);
}

export function toggleProductVisibility(requestBody: ToggleProductVisibility_Request) {
  return putRequest<ToggleProductVisibility_Request, void, ApiError>(endpoints.toggleProductVisibility, requestBody);
}

export function updateProduct(requestBody: UpdateProduct_Request) {
  const formData = new FormData();

  Object.keys(requestBody).forEach((key) => {
    const value = requestBody[key as keyof CreateProduct_Request];
    if (key !== "files" && value !== undefined) {
      formData.append(key, value as string | Blob);
    }
  });

  requestBody.files?.forEach((file) => {
    formData.append("files", file);
  });

  return putRequest<FormData, void, ApiError>(endpoints.updateProduct, formData, { params: { id: requestBody.id }, headers: { "Content-Type": "multipart/form-data" } });
}

export async function getProductDetails(requestBody: GetProductsDetails_Request) {
  const productDetails = await getRequest<GetProductDetails_Response, ApiError>(endpoints.getProductDetails + requestBody.id + "/admin", { params: requestBody });
  const files = (await Promise.allSettled(productDetails.images.map(({ imageUrl }) => fetchImageAsFile(baseUrl + imageUrl)))).map((response) =>
    response.status == "fulfilled" ? response.value : ({ preview: "", name: "CORS.image", size: 0, type: "image" } as File)
  );
  return { ...productDetails, files };
}

export function applyDiscount(requestBody: ApplyDiscount_Request) {
  return postRequest<ApplyDiscount_Request, ApplyDiscount_Response, ApiError>(endpoints.applyDiscount, requestBody);
}

export function removeDiscount(requestBody: RemoveDiscount_Request) {
  return deleteRequest<RemoveDiscount_Request, RemoveDiscount_Response, ApiError>(endpoints.removeDiscount, { data: requestBody });
}

export function changeDiscount(requestBody: ChangeDiscount_Request) {
  return putRequest<ChangeDiscount_Request, void, ApiError>(endpoints.changeDiscount, requestBody);
}
