import { patchRequest, postRequest } from "@/services/api";
import { ApiError, GetAllOrdersIssues_Response, Pagination, UpdateOrderIssue_Request, UpdateOrderIssue_Response } from "@/types/api-types";

const endpoints = {
  getAllOrdersIssues: import.meta.env.VITE_API_END_POINT_GET_ALL_ORDERS_ISSUES as string,
  updateOrderIssue: import.meta.env.VITE_API_END_POINT_UPDATE_ORDER_ISSUE as string,
};

export function getAllOrdersIssues(requestBody: Pagination) {
  return postRequest<Pagination, GetAllOrdersIssues_Response, ApiError>(endpoints.getAllOrdersIssues, requestBody);
}

export function updateOrderIssue(requestBody: UpdateOrderIssue_Request) {
  return patchRequest<UpdateOrderIssue_Request, UpdateOrderIssue_Response, ApiError>(endpoints.updateOrderIssue + requestBody.issueId, requestBody);
}
