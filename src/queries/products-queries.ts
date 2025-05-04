import { queryKeys } from "./query-keys";
import {
  ApplyDiscount_Request,
  ApiError,
  ChangeDiscount_Request,
  CreateProduct_Request,
  CreateProduct_Response,
  GetAllProducts_Response,
  GetProductDetails_Response,
  GetProductsDetails_Request,
  GetPublicProducts_Response,
  Pagination,
  Product,
  PublicProduct,
  RemoveDiscount_Request,
  ToggleProductVisibility_Request,
  UpdateProduct_Request,
  ApplyDiscount_Response,
  RemoveDiscount_Response,
} from "@/types/api-types";
import { AxiosError } from "axios";
import {
  applyDiscount,
  changeDiscount,
  createProduct,
  getAllProducts,
  getProductDetails,
  getPublicProducts,
  removeDiscount,
  toggleProductVisibility,
  updateProduct,
} from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useCreateProduct() {
  const { t } = useTranslation();
  const mutation = useMutation<CreateProduct_Response, AxiosError<ApiError, CreateProduct_Request>, CreateProduct_Request>({
    mutationFn: (requestBody) => createProduct(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createProduct"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetAllProducts(pagination: Pagination) {
  const query = useQuery<GetAllProducts_Response, AxiosError<ApiError, Pagination>, { items: Product[]; pagination: Pagination }>({
    queryKey: [queryKeys.allProducts],
    queryFn: () => getAllProducts(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetPublicProducts(pagination: Pagination) {
  const query = useQuery<GetPublicProducts_Response, AxiosError<ApiError, Pagination>, { items: PublicProduct[]; pagination: Pagination }>({
    queryKey: [queryKeys.publicProducts],
    queryFn: () => getPublicProducts(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useToggleProductVisibility() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, ToggleProductVisibility_Request>, ToggleProductVisibility_Request>({
    mutationFn: (requestBody) => toggleProductVisibility(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.toggleProductVisibility"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allProducts] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useUpdateProduct() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateProduct_Request>, UpdateProduct_Request>({
    mutationFn: (requestBody) => updateProduct(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateProduct"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allProducts] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetProductDetails(requestBody: GetProductsDetails_Request) {
  const query = useQuery<GetProductDetails_Response, AxiosError<ApiError, GetProductsDetails_Request>, GetProductDetails_Response>({
    queryKey: [queryKeys.productDetails],
    queryFn: () => getProductDetails(requestBody),
    enabled: false,
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useApplyDiscount() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<ApplyDiscount_Response, AxiosError<ApiError, ApplyDiscount_Request>, ApplyDiscount_Request>({
    mutationFn: (requestBody) => applyDiscount(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.applyDiscount"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allProducts] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useRemoveDiscount() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<RemoveDiscount_Response, AxiosError<ApiError, RemoveDiscount_Request>, RemoveDiscount_Request>({
    mutationFn: (requestBody) => removeDiscount(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.removeDiscount"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allProducts] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useChangeDiscount() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, ChangeDiscount_Request>, ChangeDiscount_Request>({
    mutationFn: (requestBody) => changeDiscount(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.changeDiscount"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allProducts] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
