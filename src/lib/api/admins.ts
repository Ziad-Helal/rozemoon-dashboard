import { postRequest } from "@/services/api";
import { ApiError, GetAdmins_Response, Pagination } from "@/types/api-types";

const endpoints = {
	getAllAdmins: import.meta.env.VITE_API_END_POINT_GET_ALL_ADMINS as string,
};

export function getAllAdmins(requestBody: Pagination) {
	return postRequest<Pagination, GetAdmins_Response, ApiError>(endpoints.getAllAdmins, requestBody);
}
