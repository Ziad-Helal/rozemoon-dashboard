import {
  assignToStore,
  cancelScheduledOrder,
  confirmScheduledOrderCancelation,
  getAllScheduledOrders,
  getStoreScheduledOrders,
  payForScheduledOrder,
  prepareScheduledOrder,
  rejectScheduledOrder,
  setScheduledOrderAsCODPaid,
} from "@/lib/api";
import {
  ApiError,
  AssignScheduledOrderToStore_Request,
  CancelScheduledOrder_Request,
  ConfirmScheduledOrderCancelation_Request,
  GetScheduledOrders_Response,
  Pagination,
  PayForScheduledOrder_Request,
  PrepareScheduledOrder_Request,
  RejectScheduledOrder_Request,
  ScheduledOrder,
  SetScheduledOrderAsCODPaid_Request,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useGetAllScheduledOrders(pagination: Pagination) {
  const query = useQuery<GetScheduledOrders_Response, AxiosError<ApiError, Pagination>, { items: ScheduledOrder[]; pagination: Pagination }>({
    queryKey: [queryKeys.allScheduledOrders],
    queryFn: () => getAllScheduledOrders(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetStoreScheduledOrders(pagination: Pagination) {
  const query = useQuery<GetScheduledOrders_Response, AxiosError<ApiError, Pagination>, { items: ScheduledOrder[]; pagination: Pagination }>({
    queryKey: [queryKeys.storeScheduledOrders],
    queryFn: () => getStoreScheduledOrders(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useAssignScheduledOrderToStore() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, AssignScheduledOrderToStore_Request>, AssignScheduledOrderToStore_Request>({
    mutationFn: (requestBody) => assignToStore(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.approveScheduledOrder"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allScheduledOrders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useRejectScheduledOrder() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, RejectScheduledOrder_Request>, RejectScheduledOrder_Request>({
    mutationFn: (requestBody) => rejectScheduledOrder(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.rejectScheduledOrder"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allScheduledOrders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useConfirmScheduledOrderCancelation() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, ConfirmScheduledOrderCancelation_Request>, ConfirmScheduledOrderCancelation_Request>({
    mutationFn: (requestBody) => confirmScheduledOrderCancelation(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.cancelScheduledOrder"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allScheduledOrders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useCancelScheduledOrder() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, CancelScheduledOrder_Request>, CancelScheduledOrder_Request>({
    mutationFn: (requestBody) => cancelScheduledOrder(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.cancelScheduledOrder"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allScheduledOrders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useSetScheduledOrderAsCODPaid() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, SetScheduledOrderAsCODPaid_Request>, SetScheduledOrderAsCODPaid_Request>({
    mutationFn: (requestBody) => setScheduledOrderAsCODPaid(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.CODOrderConfirm"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.storeScheduledOrders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function usePrepareScheduledOrder() {
  const { t } = useTranslation();
  const mutation = useMutation<void, AxiosError<ApiError, PrepareScheduledOrder_Request>, { requestBody: PrepareScheduledOrder_Request; operation: "add" | "reduce" }>({
    mutationFn: ({ requestBody, operation }) => prepareScheduledOrder(requestBody, operation),
    onSuccess: () => {
      goodHint(t("hints.good.prepareForScheduledOrder"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function usePayForScheduledOrder() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, PayForScheduledOrder_Request>, PayForScheduledOrder_Request>({
    mutationFn: (requestBody) => payForScheduledOrder(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.payForScheduledOrder"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.storeScheduledOrders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
