import { queryKeys } from "./query-keys";
import {
  ApiError,
  CreateProvider_Request,
  GetAllProviders_Response,
  GetPublicProviders_Response,
  Pagination,
  Provider,
  PublicProvider,
  ToggleProviderVisibility_Request,
  UpdateProvider_Request,
} from "@/types/api-types";
import { AxiosError } from "axios";
import { createProvider, getAllProviders, getPublicProviders, toggleProviderVisibility, updateProvider } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useCreateProvider() {
  const { t } = useTranslation();
  const mutation = useMutation<number, AxiosError<ApiError, CreateProvider_Request>, CreateProvider_Request>({
    mutationFn: (requestBody) => createProvider(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createProvider"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetAllProviders(pagination: Pagination) {
  const query = useQuery<GetAllProviders_Response, AxiosError<ApiError, Pagination>, { items: Provider[]; pagination: Pagination }>({
    queryKey: [queryKeys.allProviders],
    queryFn: () => getAllProviders(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetPublicProviders(pagination: Pagination) {
  const query = useQuery<GetPublicProviders_Response, AxiosError<ApiError, Pagination>, { items: PublicProvider[]; pagination: Pagination }>({
    queryKey: [queryKeys.publicProviders],
    queryFn: () => getPublicProviders(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useToggleProviderVisibility() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, ToggleProviderVisibility_Request>, ToggleProviderVisibility_Request>({
    mutationFn: (requestBody) => toggleProviderVisibility(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.toggleProvider"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allProviders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useUpdateProvider() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateProvider_Request>, UpdateProvider_Request>({
    mutationFn: (requestBody) => updateProvider(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateProvider"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allProviders] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
