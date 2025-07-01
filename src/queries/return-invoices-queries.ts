import { createReturnInvoice, getReturnInvoice, getReturnInvoiceProducts, getReturnInvoices, updateReturnInvoiceStatus } from "@/lib/api";
import {
  ApiError,
  CreateReturnInvoice,
  GetReturnedProducts_Response,
  GetReturnInvoice_Request,
  GetReturnInvoice_Response,
  GetReturnInvoices_Response,
  Pagination,
  ReturnedProduct,
  ReturnInvoice,
  UpdateReturnInvoiceStatus,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useCreateReturnInvoice() {
  const { t } = useTranslation();
  const mutation = useMutation<number, AxiosError<ApiError, CreateReturnInvoice>, CreateReturnInvoice>({
    mutationFn: (requestBody) => createReturnInvoice(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createReturnRequest"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetReturnInvoices(pagination: Pagination) {
  const query = useQuery<GetReturnInvoices_Response, AxiosError<ApiError, Pagination>, { items: ReturnInvoice[]; pagination: Pagination }>({
    queryKey: [queryKeys.returnInvoices],
    queryFn: () => getReturnInvoices(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetReturnInvoice(requestBody: GetReturnInvoice_Request) {
  const query = useQuery<GetReturnInvoice_Response, AxiosError<ApiError, GetReturnInvoice_Request>, GetReturnInvoice_Request>({
    queryKey: [queryKeys.returnInvoice],
    queryFn: () => getReturnInvoice(requestBody),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useUpdateReturnInvoiceStatus() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateReturnInvoiceStatus>, UpdateReturnInvoiceStatus>({
    mutationFn: (requestBody) => updateReturnInvoiceStatus(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateReturnInvoice"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.returnInvoices] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetReturnInvoiceProducts(pagination: Pagination) {
  const query = useQuery<GetReturnedProducts_Response, AxiosError<ApiError, Pagination>, { items: ReturnedProduct[]; pagination: Pagination }>({
    queryKey: [queryKeys.returnInvoiceProducts],
    queryFn: () => getReturnInvoiceProducts(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}
