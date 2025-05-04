import { deleteRequest, postRequest, putRequest } from "@/services/api";
import { ApiError, CreateSetting_Request, GetSettings_Response, DeleteSetting_Request, Pagination, UpdateSetting_Request } from "@/types/api-types";

const endpoints = {
  createSetting: import.meta.env.VITE_API_END_POINT_CREATE_SETTING as string,
  getSettings: import.meta.env.VITE_API_END_POINT_GET_SETTINGS as string,
  updateSetting: import.meta.env.VITE_API_END_POINT_UPDATE_SETTING as string,
  deleteSetting: import.meta.env.VITE_API_END_POINT_DELETE_SETTING as string,
};

export function createSetting(requestBody: CreateSetting_Request) {
  return postRequest<CreateSetting_Request, void, ApiError>(endpoints.createSetting, requestBody);
}

export function getSettings(requestBody: Pagination) {
  return postRequest<Pagination, GetSettings_Response, ApiError>(endpoints.getSettings, { ...requestBody, search: requestBody.filters?.setting });
}

export function updateSetting(requestBody: UpdateSetting_Request) {
  return putRequest<UpdateSetting_Request, void, ApiError>(endpoints.updateSetting, requestBody);
}

export function deleteSetting(requestBody: DeleteSetting_Request) {
  return deleteRequest<DeleteSetting_Request, void, ApiError>(endpoints.deleteSetting + requestBody.id, { params: requestBody });
}
