import { createColor, getAllColors, getPublicColors, toggleColorVisibility, updateColor } from "@/lib/api";
import {
  ApiError,
  Color,
  CreateColor_Request,
  CreateColor_Response,
  GetAllColors_Response,
  GetPublicColors_Response,
  Pagination,
  PublicColor,
  ToggleColorVisibility_Request,
  UpdateColor_Request,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useCreateColor() {
  const { t } = useTranslation();
  const mutation = useMutation<CreateColor_Response, AxiosError<ApiError, CreateColor_Request>, CreateColor_Request>({
    mutationFn: (requestBody) => createColor(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createColor"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetAllColors(pagination: Pagination) {
  const query = useQuery<GetAllColors_Response, AxiosError<ApiError, Pagination>, { items: Color[]; pagination: Pagination }>({
    queryKey: [queryKeys.allColors],
    queryFn: () => getAllColors(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetPublicColors(pagination: Pagination) {
  const query = useQuery<GetPublicColors_Response, AxiosError<ApiError, Pagination>, { items: PublicColor[]; pagination: Pagination }>({
    queryKey: [queryKeys.publicColors],
    queryFn: () => getPublicColors(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useToggleColorVisibility() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, ToggleColorVisibility_Request>, ToggleColorVisibility_Request>({
    mutationFn: (requestBody) => toggleColorVisibility(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.toggleColorVisibility"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allColors] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useUpdateColor() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateColor_Request>, UpdateColor_Request>({
    mutationFn: (requestBody) => updateColor(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateColor"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allColors] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
