import {
  ApiError,
  GetAllDiscounts_Response,
  Discount,
  Pagination,
  CreateDiscount_Response,
  CreateDiscount_Request,
  ToggleDiscountActiveness_Request,
  UpdateDiscount_Request,
  GetDiscountDetails_Request,
  GetDiscountDetails_Response,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { createDiscount, getAllDiscounts, getDiscountDetails, toggleDiscountActiveness, updateDiscount } from "@/lib/api";
import { badHint, goodHint } from "@/services/hint";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useCreateDiscount() {
  const { t } = useTranslation();
  const mutation = useMutation<CreateDiscount_Response, AxiosError<ApiError, CreateDiscount_Request>, CreateDiscount_Request>({
    mutationFn: (requestBody) => createDiscount(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createDiscount"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetAllDiscounts(pagination: Pagination) {
  const query = useQuery<GetAllDiscounts_Response, AxiosError<ApiError, Pagination>, { items: Discount[]; pagination: Pagination }>({
    queryKey: [queryKeys.allDiscounts],
    queryFn: () => getAllDiscounts(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });
  return query;
}

export function useToggleDiscountActiveness() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, ToggleDiscountActiveness_Request>, ToggleDiscountActiveness_Request>({
    mutationFn: (requestBody) => toggleDiscountActiveness(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.toggleDiscountActiveness"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allDiscounts] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useUpdateDiscount() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateDiscount_Request>, UpdateDiscount_Request>({
    mutationFn: (requestBody) => updateDiscount(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateDiscount"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allDiscounts] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetDiscountDetails(requestBody: GetDiscountDetails_Request) {
  const query = useQuery<GetDiscountDetails_Response, AxiosError<ApiError, GetDiscountDetails_Request>, GetDiscountDetails_Response>({
    queryKey: [queryKeys.discountDetails],
    queryFn: () => getDiscountDetails(requestBody),
    enabled: false,
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}
