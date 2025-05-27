import {
  ApiError,
  GetAllCoupons_Response,
  Coupon,
  Pagination,
  CreateCoupon_Request,
  UpdateCoupon_Request,
  GetCouponDetails_Request,
  GetCouponDetails_Response,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { createCoupon, getAllCoupons, getCouponDetails, updateCoupon } from "@/lib/api";
import { badHint, goodHint } from "@/services/hint";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useCreateCoupon() {
  const { t } = useTranslation();
  const mutation = useMutation<void, AxiosError<ApiError, CreateCoupon_Request>, CreateCoupon_Request>({
    mutationFn: (requestBody) => createCoupon(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createCoupon"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetAllCoupons(pagination: Pagination) {
  const query = useQuery<GetAllCoupons_Response, AxiosError<ApiError, Pagination>, { items: Coupon[]; pagination: Pagination }>({
    queryKey: [queryKeys.allCoupons],
    queryFn: () => getAllCoupons(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });
  return query;
}

export function useToggleCouponActiveness() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateCoupon_Request>, UpdateCoupon_Request>({
    mutationFn: (requestBody) => updateCoupon({ ...requestBody, isActivated: !requestBody.isActivated }),
    onSuccess: () => {
      goodHint(t("hints.good.toggleCouponActiveness"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allCoupons] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useUpdateCoupon() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateCoupon_Request>, UpdateCoupon_Request>({
    mutationFn: (requestBody) => updateCoupon(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateCoupon"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allCoupons] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetCouponDetails(requestBody: GetCouponDetails_Request) {
  const query = useQuery<GetCouponDetails_Response, AxiosError<ApiError, GetCouponDetails_Request>, GetCouponDetails_Response>({
    queryKey: [queryKeys.couponDetails],
    queryFn: () => getCouponDetails(requestBody),
    enabled: false,
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}
