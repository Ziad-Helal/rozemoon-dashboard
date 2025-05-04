import { postRequest } from "@/services/api";
import { ApiError, GetStorekeepers_Response, Pagination, Storekeeper } from "@/types/api-types";

const endpoints = {
	getAllStorekepers: import.meta.env.VITE_API_END_POINT_GET_ALL_STOREKEEPERS as string,
	getStoreStorekeepers: import.meta.env.VITE_API_END_POINT_GET_STORE_STOREKEEPERS as string,
};

export function getAllStorekeepers(requestBody: Pagination) {
	return postRequest<Pagination, GetStorekeepers_Response, ApiError>(endpoints.getAllStorekepers, requestBody);
}

export function getStoreStorekeepers() {
	return postRequest<Pagination, Storekeeper, ApiError>(endpoints.getStoreStorekeepers, {});
}
