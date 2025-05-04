import { postRequest } from "@/services/api";
import { ApiError, GetCashiers_Response, Pagination } from "@/types/api-types";

const endpoints = {
	getAllCashiers: import.meta.env.VITE_API_END_POINT_GET_ALL_CASHIERS as string,
	getStoreCashiers: import.meta.env.VITE_API_END_POINT_GET_STORE_CASHIERS as string,
};

export function getAllCashiers(requestBody: Pagination) {
	return postRequest<Pagination, GetCashiers_Response, ApiError>(endpoints.getAllCashiers, requestBody);
}

export function getStoreCashiers(requestBody: Pagination) {
	return postRequest<Pagination, GetCashiers_Response, ApiError>(endpoints.getStoreCashiers, requestBody);
}
