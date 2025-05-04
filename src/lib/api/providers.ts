import { postRequest, putRequest } from "@/services/api";
import {
  ApiError,
  CreateProvider_Request,
  GetAllProviders_Response,
  GetPublicProviders_Response,
  Pagination,
  ToggleProviderVisibility_Request,
  UpdateProvider_Request,
} from "@/types/api-types";

const endpoints = {
  createProvider: import.meta.env.VITE_API_END_POINT_CREATE_PROVIDER as string,
  getAllProviders: import.meta.env.VITE_API_END_POINT_GET_ALL_PROVIDERS as string,
  getPublicProviders: import.meta.env.VITE_API_END_POINT_GET_PUBLIC_PROVIDERS as string,
  toggleProviderVisibility: import.meta.env.VITE_API_END_POINT_TOGGLE_PROVIDER_VISIBILITY as string,
  updateProvider: import.meta.env.VITE_API_END_POINT_UPDATE_PROVIDER as string,
};

export function createProvider(requestBody: CreateProvider_Request) {
  return postRequest<CreateProvider_Request, number, ApiError>(endpoints.createProvider, requestBody);
}

export function getAllProviders(requestBody: Pagination) {
  return postRequest<Pagination, GetAllProviders_Response, ApiError>(endpoints.getAllProviders, requestBody);
}

export function getPublicProviders(requestBody: Pagination) {
  return postRequest<Pagination, GetPublicProviders_Response, ApiError>(endpoints.getPublicProviders, requestBody);
}

export function toggleProviderVisibility(requestBody: ToggleProviderVisibility_Request) {
  return putRequest<ToggleProviderVisibility_Request, void, ApiError>(endpoints.toggleProviderVisibility, requestBody);
}

export function updateProvider(requestBody: UpdateProvider_Request) {
  return putRequest<UpdateProvider_Request, void, ApiError>(endpoints.updateProvider, requestBody);
}
