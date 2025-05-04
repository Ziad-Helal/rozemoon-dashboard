import { postRequest } from "@/services/api";
import { ApiError, GetClients_Response, Pagination, UpdateUserWallet_Request } from "@/types/api-types";

const endpoints = {
  getAllClients: import.meta.env.VITE_API_END_POINT_GET_ALL_CLIENTS as string,
  updateUserWallet: import.meta.env.VITE_API_END_POINT_UPDATE_USER_WALLET as string,
};

export function getAllClients(requestBody: Pagination) {
  return postRequest<Pagination, GetClients_Response, ApiError>(endpoints.getAllClients, requestBody);
}

export function updateUserWallet(requestBody: UpdateUserWallet_Request) {
  return postRequest<UpdateUserWallet_Request, void, ApiError>(endpoints.updateUserWallet, requestBody);
}
