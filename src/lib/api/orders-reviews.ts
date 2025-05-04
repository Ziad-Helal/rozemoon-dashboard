import { postRequest } from "@/services/api";
import { ApiError, GetOrdersReviews_Response, Pagination } from "@/types/api-types";

const endpoints = {
  getOrdersReviews: import.meta.env.VITE_API_END_POINT_GET_ORDERS_REVIEWS as string,
};

export function getOrdersReviews(requestBody: Pagination) {
  return postRequest<Pagination, GetOrdersReviews_Response, ApiError>(endpoints.getOrdersReviews, requestBody);
}
