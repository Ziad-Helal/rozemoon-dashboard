import {
  ApiError,
  AuthenticateStockRefill_Request,
  CreateStockRefill_Request,
  GetStock_Response,
  GetStockRefills_Response,
  Pagination,
  Refill_Cart,
  Refill_CartItem,
  StockProduct,
  StockRefill,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { approveStockRefill, createStockRefill, getStock, getStockRefills, rejectStockRefill } from "@/lib/api";
import { getRefillCartProps } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function useGetStock(pagination: Pagination) {
  const query = useQuery<GetStock_Response, AxiosError<ApiError, Pagination>, { items: StockProduct[]; pagination: Pagination }>({
    queryKey: [queryKeys.stock],
    queryFn: () => getStock(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetStockRefills(pagination: Pagination) {
  const query = useQuery<GetStockRefills_Response, AxiosError<ApiError, Pagination>, { items: StockRefill[]; pagination: Pagination }>({
    queryKey: [queryKeys.stockRefills],
    queryFn: () => getStockRefills(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useCreateRefill() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<string, AxiosError<ApiError, CreateStockRefill_Request>, CreateStockRefill_Request>({
    mutationFn: (requestBody) => createStockRefill(requestBody),
    onSuccess: () => {
      queryClient.setQueryData([queryKeys.refillCart], { items: [], ...getRefillCartProps([]) });
      goodHint(t("hints.good.createRefillRequest"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useInitializeRefillCart() {
  const query = useQuery<Refill_Cart, AxiosError<ApiError>, Refill_Cart>({
    queryKey: [queryKeys.refillCart],
    queryFn: () => ({ items: [], ...getRefillCartProps([]) }),
  });
  return query;
}

export function useUpdateRefillCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Refill_Cart, AxiosError<ApiError>, Refill_CartItem>({
    mutationFn: async (refillItem) => {
      let { items } = queryClient.getQueryData<Refill_Cart>([queryKeys.refillCart]) as Refill_Cart;
      const itemIndex = items.findIndex(({ productId }) => productId == refillItem.productId);
      if (itemIndex != undefined && itemIndex != -1)
        if (refillItem.quantity) items = items.map((item) => (item.productId == refillItem.productId ? refillItem : item));
        else items.splice(itemIndex, 1);
      else items.push(refillItem);
      const newCart = { items, ...getRefillCartProps(items) };
      queryClient.setQueryData([queryKeys.refillCart], newCart);
      return newCart;
    },
  });
  return mutation;
}

export function useRemoveFromRefillCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Refill_Cart, AxiosError<ApiError>, number>({
    mutationFn: async (refillItemId) => {
      let refillCart = queryClient.getQueryData<Refill_Cart>([queryKeys.refillCart]);
      const items = refillCart?.items.filter((item) => item.productId != refillItemId) as Refill_CartItem[];
      const newCart = { items, ...getRefillCartProps(items) };
      queryClient.setQueryData([queryKeys.refillCart], newCart);
      return newCart;
    },
  });
  return mutation;
}

export function useClearRefillCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: async () => {
      queryClient.setQueryData([queryKeys.refillCart], { items: [], ...getRefillCartProps([]) });
    },
  });
  return mutation;
}

export function useApproveStockRefill() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<string, AxiosError<ApiError, AuthenticateStockRefill_Request>, AuthenticateStockRefill_Request>({
    mutationFn: (requestBody) => approveStockRefill(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.approveRefillRequest"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.stockRefills] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useRejectStockRefill() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<string, AxiosError<ApiError, AuthenticateStockRefill_Request>, AuthenticateStockRefill_Request>({
    mutationFn: (requestBody) => rejectStockRefill(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.rejectRefillRequest"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.stockRefills] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
