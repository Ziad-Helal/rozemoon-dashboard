import { cancelFastOrderByManager, createFastOrder, getAllFastOrders, getMyFastOrders, getStoreFastOrders, setFastOrderAsCODPaid, updateFastOrderStatus } from "@/lib/api";
import {
  ApiError,
  FastOrder,
  FastOrder_Cart,
  GetFastOrders_Response,
  Pagination,
  FastOrder_CartItem,
  CreateFastOrder_Request,
  CreateFastOrder_Response,
  UpdateFastOrderStatus_Request,
  SetFastOrderAsCODPaid_Request,
  ProductPricingType,
  CancelFastOrder_Request,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { getFastOrderCartProps } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function useGetAllFastOrders(pagination: Pagination) {
  const query = useQuery<GetFastOrders_Response, AxiosError<ApiError, Pagination>, { items: FastOrder[]; pagination: Pagination }>({
    queryKey: [queryKeys.allFastOrders],
    queryFn: () => getAllFastOrders(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetStoreFastOrders(pagination: Pagination) {
  const query = useQuery<GetFastOrders_Response, AxiosError<ApiError, Pagination>, { items: FastOrder[]; pagination: Pagination }>({
    queryKey: [queryKeys.storeFastOrders],
    queryFn: () => getStoreFastOrders(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetMyFastOrders(pagination: Pagination) {
  const query = useQuery<GetFastOrders_Response, AxiosError<ApiError, Pagination>, { items: FastOrder[]; pagination: Pagination }>({
    queryKey: [queryKeys.myFastOrders],
    queryFn: () => getMyFastOrders(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useCreateFastOrder() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<CreateFastOrder_Response, AxiosError<ApiError, CreateFastOrder_Request>, CreateFastOrder_Request>({
    mutationFn: (requestBody) => createFastOrder(requestBody),
    onSuccess: () => {
      queryClient.setQueryData([queryKeys.fastOrderCart], { items: [], ...getFastOrderCartProps([]) });
      goodHint(t("hints.good.createOrder"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useInitializeFastOrderCart() {
  const query = useQuery<FastOrder_Cart, AxiosError<ApiError>, FastOrder_Cart>({
    queryKey: [queryKeys.fastOrderCart],
    queryFn: () => ({ items: [], priceType: "merch", ...getFastOrderCartProps([]) }),
    enabled: false,
  });
  return query;
}

export function useUpdateFastOrderCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation<FastOrder_Cart, AxiosError<ApiError>, FastOrder_CartItem>({
    mutationFn: async (fastOrderItem) => {
      let prevCart = queryClient.getQueryData<FastOrder_Cart>([queryKeys.fastOrderCart]) as FastOrder_Cart;
      const itemIndex = prevCart.items.findIndex(({ productId }) => productId == fastOrderItem.productId);
      if (itemIndex != undefined && itemIndex != -1)
        if (fastOrderItem.quantity) prevCart.items = prevCart.items.map((item) => (item.productId == fastOrderItem.productId ? fastOrderItem : item));
        else prevCart.items.splice(itemIndex, 1);
      else prevCart.items.push(fastOrderItem);
      const newCart = { items: prevCart.items, priceType: prevCart.priceType, ...getFastOrderCartProps(prevCart.items) };
      queryClient.setQueryData([queryKeys.fastOrderCart], newCart);
      return newCart;
    },
  });
  return mutation;
}

export function useUpdateFastOrderCartPriceType() {
  const queryClient = useQueryClient();
  const mutation = useMutation<FastOrder_Cart, AxiosError<ApiError>, ProductPricingType>({
    mutationFn: async (priceType) => {
      let prevCart = queryClient.getQueryData<FastOrder_Cart>([queryKeys.fastOrderCart]) as FastOrder_Cart;
      const newCart = { ...prevCart, priceType };
      queryClient.setQueryData([queryKeys.fastOrderCart], newCart);
      return newCart;
    },
  });
  return mutation;
}

export function useRemoveFromFastOrderCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation<FastOrder_Cart, AxiosError<ApiError>, number>({
    mutationFn: async (fastOrderItemId) => {
      let fastOrderCart = queryClient.getQueryData<FastOrder_Cart>([queryKeys.fastOrderCart]);
      const items = fastOrderCart?.items.filter((item) => item.productId != fastOrderItemId) as FastOrder_CartItem[];
      const newCart = { items, priceType: fastOrderCart?.priceType || "merch", ...getFastOrderCartProps(items) };
      queryClient.setQueryData([queryKeys.fastOrderCart], newCart);
      return newCart;
    },
  });
  return mutation;
}

export function useClearFastOrderCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: async () => {
      queryClient.setQueryData([queryKeys.fastOrderCart], { items: [], priceType: "merch", ...getFastOrderCartProps([]) });
    },
  });
  return mutation;
}

export function useUpdateFastOrderStatus() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateFastOrderStatus_Request>, UpdateFastOrderStatus_Request>({
    mutationFn: (requestBody) => updateFastOrderStatus(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateOrder"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.storeFastOrders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useCancelFastOrderByManager() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, CancelFastOrder_Request>, CancelFastOrder_Request>({
    mutationFn: (requestBody) => cancelFastOrderByManager(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.cancelFastOrder"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.storeFastOrders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useSetFastOrderAsCODPaid() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, SetFastOrderAsCODPaid_Request>, SetFastOrderAsCODPaid_Request>({
    mutationFn: (requestBody) => setFastOrderAsCODPaid(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.CODOrderConfirm"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.storeFastOrders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
