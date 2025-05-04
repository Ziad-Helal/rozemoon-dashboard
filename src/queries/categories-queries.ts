import { createCategory, getAllCategories, getPublicCategories, toggleCategoryVisibility, updateCategory } from "@/lib/api";
import {
  ApiError,
  Category,
  CreateCategory_Request,
  CreateCategory_Response,
  GetAllCategories_Response,
  GetPublicCategories_Response,
  Pagination,
  PublicCategory,
  ToggleCategoryVisibility_Request,
  UpdateCategory_Request,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useCreateCategory() {
  const { t } = useTranslation();
  const mutation = useMutation<CreateCategory_Response, AxiosError<ApiError, CreateCategory_Request>, CreateCategory_Request>({
    mutationFn: (requestBody) => createCategory(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createCategory"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetAllCategories(pagination: Pagination) {
  const query = useQuery<GetAllCategories_Response, AxiosError<ApiError, Pagination>, { items: Category[]; pagination: Pagination }>({
    queryKey: [queryKeys.allCategories],
    queryFn: () => getAllCategories(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetPublicCategories(pagination: Pagination) {
  const query = useQuery<GetPublicCategories_Response, AxiosError<ApiError, Pagination>, { items: PublicCategory[]; pagination: Pagination }>({
    queryKey: [queryKeys.publicCategories],
    queryFn: () => getPublicCategories(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useToggleCategoryVisibility() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, ToggleCategoryVisibility_Request>, ToggleCategoryVisibility_Request>({
    mutationFn: (requestBody) => toggleCategoryVisibility(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.toggleCategoryVisibility"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allCategories] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useUpdateCategory() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateCategory_Request>, UpdateCategory_Request>({
    mutationFn: (requestBody) => updateCategory(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateCategory"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allCategories] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
