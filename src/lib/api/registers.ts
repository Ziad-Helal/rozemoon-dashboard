import { getRequest, postRequest } from "@/services/api";
import { ApiError, Document, GetRegisterDocuments_Request, GetRegisters_Response, Pagination, RegisterAuthentication_Request } from "@/types/api-types";

const endpoints = {
  getRegisters: import.meta.env.VITE_API_END_POINT_GET_REGISTERS as string,
  authenticateRegister: import.meta.env.VITE_API_END_POINT_AUTHENTICATE_REGISTER as string,
  getRegisterDocuments: import.meta.env.VITE_API_END_POINT_GET_REGISTER_DOCUMENTS as string,
};

export function getRegisters(requestBody: Pagination) {
  return postRequest<Pagination, GetRegisters_Response, ApiError>(endpoints.getRegisters, requestBody);
}

export function authenticateRegister(requestBody: RegisterAuthentication_Request) {
  return postRequest<RegisterAuthentication_Request, string, ApiError>(endpoints.authenticateRegister, requestBody);
}

export function getRegisterDocuments(requestBody: GetRegisterDocuments_Request) {
  return getRequest<{ docs: Document[] }, ApiError>(endpoints.getRegisterDocuments + requestBody.userId, { params: requestBody }).then(({ docs }) => docs);
}
