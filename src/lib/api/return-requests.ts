import { postRequest } from "@/services/api";
import { ApiError, CreateReturnRequest_Request, CreateReturnRequest_Response, GetReturnRequests_Response, Pagination, SetReturnRequestStatus_Request } from "@/types/api-types";

const endpoints = {
  getReturnRequests: import.meta.env.VITE_API_END_POINT_GET_RETURN_REQUESTS as string,
  createReturnRequest: import.meta.env.VITE_API_END_POINT_CREATE_RETURN_REQUEST as string,
  approveReturnByManager: import.meta.env.VITE_API_END_POINT_APPROVE_RETURN_BY_MANAGER as string,
  rejectReturnByManager: import.meta.env.VITE_API_END_POINT_REJECT_RETURN_BY_MANAGER as string,
  approveReturnByAdmin: import.meta.env.VITE_API_END_POINT_APPROVE_RETURN_BY_ADMIN as string,
  rejectReturnByAdmin: import.meta.env.VITE_API_END_POINT_REJECT_RETURN_BY_ADMIN as string,
};

export function getReturnRequests(requestBody: Pagination) {
  return postRequest<Pagination, GetReturnRequests_Response, ApiError>(endpoints.getReturnRequests, requestBody);
}

export function createReturnRequest(requestBody: CreateReturnRequest_Request) {
  return postRequest<CreateReturnRequest_Request, CreateReturnRequest_Response, ApiError>(endpoints.createReturnRequest, requestBody);
}

export function approveReturnByManager(requestBody: SetReturnRequestStatus_Request) {
  return postRequest<SetReturnRequestStatus_Request, void, ApiError>(endpoints.approveReturnByManager + requestBody.id + "/approve-manager", requestBody);
}

export function rejectReturnByManager(requestBody: SetReturnRequestStatus_Request) {
  return postRequest<SetReturnRequestStatus_Request, void, ApiError>(endpoints.rejectReturnByManager + requestBody.id + "/reject-manager", requestBody);
}

export function approveReturnByAdmin(requestBody: SetReturnRequestStatus_Request) {
  return postRequest<SetReturnRequestStatus_Request, void, ApiError>(endpoints.approveReturnByAdmin + requestBody.id + "/approve-admin", requestBody);
}

export function rejectReturnByAdmin(requestBody: SetReturnRequestStatus_Request) {
  return postRequest<SetReturnRequestStatus_Request, void, ApiError>(endpoints.rejectReturnByAdmin + requestBody.id + "/reject-admin", requestBody);
}
