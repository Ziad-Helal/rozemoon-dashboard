import { postRequest } from "@/services/api";
import { ApiError, GetProductsReviews_Response, Pagination } from "@/types/api-types";

const endpoints = {
	getProductsReviews: import.meta.env.VITE_API_END_POINT_GET_PRODUCTS_REVIEWS as string,
};

export function getProductsReviews(requestBody: Pagination) {
	return postRequest<Pagination, GetProductsReviews_Response, ApiError>(endpoints.getProductsReviews, requestBody);
}
