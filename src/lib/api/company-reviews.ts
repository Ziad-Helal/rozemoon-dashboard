import { postRequest, putRequest } from "@/services/api";
import {
  ApiError,
  CreateCompanyReview_Request,
  CreateCompanyReview_Response,
  GetCompanyReviews_Response,
  Pagination,
  ToggleCompanyReviewVisibility_Request,
  UpdateCompanyReview_Request,
} from "@/types/api-types";

const endpoints = {
  createCompanyReview: import.meta.env.VITE_API_END_POINT_CREATE_COMPANY_REVIEW as string,
  getCompanyReviews: import.meta.env.VITE_API_END_POINT_GET_COMPANY_REVIEWS as string,
  toggleCompanyReviewVisibility: import.meta.env.VITE_API_END_POINT_TOGGLE_COMPANY_REVIEW_VISIBILITY as string,
  updateCompanyReview: import.meta.env.VITE_API_END_POINT_UPDATE_COMPANY_REVIEW as string,
};

export function createCompanyReview(requestBody: CreateCompanyReview_Request) {
  return postRequest<CreateCompanyReview_Request, CreateCompanyReview_Response, ApiError>(endpoints.createCompanyReview, requestBody);
}

export function getCompanyReviews(requestBody: Pagination) {
  return postRequest<Pagination, GetCompanyReviews_Response, ApiError>(endpoints.getCompanyReviews, requestBody);
}

export function toggleCompanyReviewVisibility(requestBody: ToggleCompanyReviewVisibility_Request) {
  return putRequest<ToggleCompanyReviewVisibility_Request, void, ApiError>(endpoints.toggleCompanyReviewVisibility + requestBody.id, requestBody);
}

export function updateCompanyReview(requestBody: UpdateCompanyReview_Request) {
  return putRequest<UpdateCompanyReview_Request, void, ApiError>(endpoints.updateCompanyReview + requestBody.id, requestBody);
}
