import type {
  ApiError,
  CreateDamageInvoice,
  DamagedProduct,
  DamageInvoice,
  GetDamagedProducts_Response,
  GetDamageInvoice_Request,
  GetDamageInvoice_Response,
  GetDamageInvoices_Response,
  Pagination,
  UpdateDamageInvoiceStatus,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";
import { createDamageInvoice, getDamageInvoice, getDamageInvoiceProducts, getDamageInvoices, updateDamageInvoiceStatus } from "@/lib/api";

export function useCreateDamageInvoice() {
  const { t } = useTranslation();
  const mutation = useMutation<number, AxiosError<ApiError, CreateDamageInvoice>, CreateDamageInvoice>({
    mutationFn: (requestBody) => createDamageInvoice(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createDamageRequest"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetDamageInvoices(pagination: Pagination) {
  const query = useQuery<GetDamageInvoices_Response, AxiosError<ApiError, Pagination>, { items: DamageInvoice[]; pagination: Pagination }>({
    queryKey: [queryKeys.damageInvoices],
    queryFn: () => getDamageInvoices(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetDamageInvoice(requestBody: GetDamageInvoice_Request) {
  const query = useQuery<GetDamageInvoice_Response, AxiosError<ApiError, GetDamageInvoice_Request>, GetDamageInvoice_Response>({
    queryKey: [queryKeys.damageInvoice],
    queryFn: () => getDamageInvoice(requestBody),
    enabled: false,
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useUpdateDamageInvoiceStatus() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateDamageInvoiceStatus>, UpdateDamageInvoiceStatus>({
    mutationFn: (requestBody) => updateDamageInvoiceStatus(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateDamageInvoice"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.damageInvoices] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetDamageInvoiceProducts(pagination: Pagination) {
  const query = useQuery<GetDamagedProducts_Response, AxiosError<ApiError, Pagination>, { items: DamagedProduct[]; pagination: Pagination }>({
    queryKey: [queryKeys.damageInvoiceProducts],
    queryFn: () => getDamageInvoiceProducts(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}
