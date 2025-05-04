import { postRequest, putRequest } from "@/services/api";
import {
  ApiError,
  CreateColor_Request,
  CreateColor_Response,
  GetAllColors_Response,
  GetPublicColors_Response,
  Pagination,
  ToggleColorVisibility_Request,
  UpdateColor_Request,
} from "@/types/api-types";

const endpoints = {
  createColor: import.meta.env.VITE_API_END_POINT_CREATE_COLOR as string,
  getAllColors: import.meta.env.VITE_API_END_POINT_GET_ALL_COLORS as string,
  getPublicColors: import.meta.env.VITE_API_END_POINT_GET_PUBLIC_COLORS as string,
  toggleColorVisibility: import.meta.env.VITE_API_END_POINT_TOGGLE_COLOR_VISIBILITY as string,
  updateColor: import.meta.env.VITE_API_END_POINT_UPDATE_COLOR as string,
};

export function createColor(requestBody: CreateColor_Request) {
  return postRequest<CreateColor_Request, CreateColor_Response, ApiError>(endpoints.createColor, requestBody);
}

export function getAllColors(requestBody: Pagination) {
  return postRequest<Pagination, GetAllColors_Response, ApiError>(endpoints.getAllColors, requestBody);
}

export function getPublicColors(requestBody: Pagination) {
  return postRequest<Pagination, GetPublicColors_Response, ApiError>(endpoints.getPublicColors, requestBody);
}

export function toggleColorVisibility(requestBody: ToggleColorVisibility_Request) {
  return putRequest<ToggleColorVisibility_Request, void, ApiError>(endpoints.toggleColorVisibility, requestBody);
}

export function updateColor(requestBody: UpdateColor_Request) {
  return putRequest<UpdateColor_Request, void, ApiError>(endpoints.updateColor + requestBody.id, requestBody);
}
