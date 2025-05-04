import {
  ApiError,
  CreateStore_Request,
  CreateStore_Response,
  GetAllStores_Response,
  GetStoreDetails_Request,
  GetStoreDetails_Response,
  Pagination,
  Store,
  ToggleStoreVisibility_Request,
  UpdateStore_Request,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { createStore, getAllStores, getStoreDetails, toggleStoreVisibility, updateStore } from "@/lib/api";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useCreateStore() {
  const { t } = useTranslation();
  const mutation = useMutation<CreateStore_Response, AxiosError<ApiError, CreateStore_Request>, CreateStore_Request>({
    mutationFn: (requestBody) => createStore(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createStore"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetAllStores(pagination: Pagination) {
  const query = useQuery<GetAllStores_Response, AxiosError<ApiError, Pagination>, { items: Store[]; pagination: Pagination }>({
    queryKey: [queryKeys.allStores],
    queryFn: () => getAllStores(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useToggleStoreVisibility() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, ToggleStoreVisibility_Request>, ToggleStoreVisibility_Request>({
    mutationFn: (requestBody) => toggleStoreVisibility(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.toggleStoreVisibility"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allStores] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useUpdateStore() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateStore_Request>, UpdateStore_Request>({
    mutationFn: (requestBody) => updateStore(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateStore"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allStores] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetStoreDetails(requestBody: GetStoreDetails_Request) {
  const query = useQuery<GetStoreDetails_Response, AxiosError<ApiError, GetStoreDetails_Request>, GetStoreDetails_Response>({
    queryKey: [queryKeys.storeDetails],
    queryFn: () => getStoreDetails(requestBody),
    enabled: false,
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}
