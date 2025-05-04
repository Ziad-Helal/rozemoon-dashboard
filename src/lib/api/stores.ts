import { getRequest, postRequest, putRequest } from "@/services/api";
import {
  ApiError,
  CreateStore_Request,
  CreateStore_Response,
  GetAllStores_Response,
  GetStoreDetails_Request,
  GetStoreDetails_Response,
  Pagination,
  ToggleStoreVisibility_Request,
  UpdateStore_Request,
} from "@/types/api-types";

const endpoints = {
  createStore: import.meta.env.VITE_API_END_POINT_CREATE_STORE as string,
  getAllStores: import.meta.env.VITE_API_END_POINT_GET_ALL_STORES as string,
  updateStore: import.meta.env.VITE_API_END_POINT_UPDATE_STORE as string,
  toggleStoreVisibility: import.meta.env.VITE_API_END_POINT_TOGGLE_STORE_VISIBILITY as string,
  getStoreDetails: import.meta.env.VITE_API_END_POINT_GET_STORE_DETAILS as string,
};

export function createStore(requestBody: CreateStore_Request) {
  return postRequest<CreateStore_Request, CreateStore_Response, ApiError>(endpoints.createStore, requestBody);
}

export function getAllStores(requestBody: Pagination) {
  return postRequest<Pagination, GetAllStores_Response, ApiError>(endpoints.getAllStores, requestBody);
}

export function updateStore(requestBody: UpdateStore_Request) {
  return putRequest<UpdateStore_Request, void, ApiError>(endpoints.updateStore + requestBody.id, requestBody, { params: { id: requestBody.id } });
}

export function toggleStoreVisibility(requestBody: ToggleStoreVisibility_Request) {
  return putRequest<ToggleStoreVisibility_Request, void, ApiError>(endpoints.toggleStoreVisibility + requestBody.id, requestBody);
}

export function getStoreDetails(requestBody: GetStoreDetails_Request) {
  return getRequest<GetStoreDetails_Response, ApiError>(endpoints.getStoreDetails + requestBody.id + "/admin", { params: requestBody });
}
