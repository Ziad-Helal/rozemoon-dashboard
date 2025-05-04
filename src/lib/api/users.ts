import { postRequest } from "@/services/api";
import { ApiError, CreateUser_Request, CreateUser_Response } from "@/types/api-types";

const endpoints = {
  createAdmin: import.meta.env.VITE_API_END_POINT_CREATE_ADMIN as string,
  createManager: import.meta.env.VITE_API_END_POINT_CREATE_MANAGER as string,
  createStoreKeeper: import.meta.env.VITE_API_END_POINT_CREATE_STOREKEEPER as string,
  createCashier: import.meta.env.VITE_API_END_POINT_CREATE_CASHIER as string,
};

export function createUser(requestBody: CreateUser_Request) {
  return postRequest<CreateUser_Request, CreateUser_Response, ApiError>(endpoints[`create${requestBody.role}`], requestBody);
}
