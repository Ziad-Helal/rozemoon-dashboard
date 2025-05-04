import { postRequest } from "@/services/api";
import { ApiError, GetManagers_Response, Pagination } from "@/types/api-types";

const endpoints = {
	getAllManagers: import.meta.env.VITE_API_END_POINT_GET_ALL_MANAGERS as string,
};

export function getAllManagers(requestBody: Pagination) {
	return postRequest<Pagination, GetManagers_Response, ApiError>(endpoints.getAllManagers, requestBody);
}
