import { postRequest, putRequest } from "@/services/api";
import {
  ApiError,
  CreateCategory_Request,
  CreateCategory_Response,
  GetAllCategories_Response,
  GetPublicCategories_Response,
  Pagination,
  ToggleCategoryVisibility_Request,
  UpdateCategory_Request,
} from "@/types/api-types";

const endpoints = {
  createCategory: import.meta.env.VITE_API_END_POINT_CREATE_CATEGORY as string,
  getAllCategories: import.meta.env.VITE_API_END_POINT_GET_ALL_CATEGORIES as string,
  getPublicCategories: import.meta.env.VITE_API_END_POINT_GET_PUBLIC_CATEGORIES as string,
  toggleCategoryVisibility: import.meta.env.VITE_API_END_POINT_TOGGLE_CATEGORY_VISIBILITY as string,
  updateCategory: import.meta.env.VITE_API_END_POINT_UPDATE_CATEGORY as string,
};

export function createCategory(requestBody: CreateCategory_Request) {
  return postRequest<CreateCategory_Request, CreateCategory_Response, ApiError>(endpoints.createCategory, requestBody);
}

export function getAllCategories(requestBody: Pagination) {
  return postRequest<Pagination, GetAllCategories_Response, ApiError>(endpoints.getAllCategories, requestBody);
}

export function getPublicCategories(requestBody: Pagination) {
  return postRequest<Pagination, GetPublicCategories_Response, ApiError>(endpoints.getPublicCategories, requestBody);
}

export function toggleCategoryVisibility(requestBody: ToggleCategoryVisibility_Request) {
  return putRequest<ToggleCategoryVisibility_Request, void, ApiError>(endpoints.toggleCategoryVisibility, requestBody);
}

export function updateCategory(requestBody: UpdateCategory_Request) {
  return putRequest<UpdateCategory_Request, void, ApiError>(endpoints.updateCategory + requestBody.id, requestBody);
}
