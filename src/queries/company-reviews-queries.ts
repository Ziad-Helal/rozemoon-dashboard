import { queryKeys } from "./query-keys";
import {
  ApiError,
  CompanyReview,
  CreateCompanyReview_Request,
  CreateCompanyReview_Response,
  GetCompanyReviews_Response,
  Pagination,
  ToggleCompanyReviewVisibility_Request,
  UpdateCompanyReview_Request,
} from "@/types/api-types";
import { AxiosError } from "axios";
import { createCompanyReview, getCompanyReviews, toggleCompanyReviewVisibility, updateCompanyReview } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useCreateCompanyReview() {
  const { t } = useTranslation();
  const mutation = useMutation<CreateCompanyReview_Response, AxiosError<ApiError, CreateCompanyReview_Request>, CreateCompanyReview_Request>({
    mutationFn: (requestBody) => createCompanyReview(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createReview"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetCompanyReviews(pagination: Pagination) {
  const query = useQuery<GetCompanyReviews_Response, AxiosError<ApiError, Pagination>, { items: CompanyReview[]; pagination: Pagination }>({
    queryKey: [queryKeys.companyReviews],
    queryFn: () => getCompanyReviews(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useToggleCompanyReviewVisibility() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, ToggleCompanyReviewVisibility_Request>, ToggleCompanyReviewVisibility_Request>({
    mutationFn: (requestBody) => toggleCompanyReviewVisibility(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.toggleReviewVisibility"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.companyReviews] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useUpdateCompanyReview() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateCompanyReview_Request>, UpdateCompanyReview_Request>({
    mutationFn: (requestBody) => updateCompanyReview(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateReview"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.companyReviews] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
