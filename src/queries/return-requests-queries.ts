import { approveReturnByAdmin, approveReturnByManager, createReturnRequest, getReturnRequests, rejectReturnByAdmin, rejectReturnByManager } from "@/lib/api/return-requests";
import { badHint, goodHint } from "@/services/hint";
import {
  ApiError,
  CreateReturnRequest_Request,
  CreateReturnRequest_Response,
  GetReturnRequests_Response,
  Pagination,
  ReturnRequest,
  SetReturnRequestStatus_Request,
} from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useCreateReturnRequest() {
  const { t } = useTranslation();
  const mutation = useMutation<CreateReturnRequest_Response, AxiosError<ApiError, CreateReturnRequest_Request>, CreateReturnRequest_Request>({
    mutationFn: (requestBody) => createReturnRequest(requestBody),
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

export function useGetReturnRequests(pagination: Pagination) {
  const query = useQuery<GetReturnRequests_Response, AxiosError<ApiError, Pagination>, { items: ReturnRequest[]; pagination: Pagination }>({
    queryKey: [queryKeys.returnRequests],
    queryFn: () => getReturnRequests(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useApproveReturnByManager() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, SetReturnRequestStatus_Request>, SetReturnRequestStatus_Request>({
    mutationFn: (requestBody) => approveReturnByManager(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.approveReturnRequest"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.returnRequests] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useRejectReturnByManager() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, SetReturnRequestStatus_Request>, SetReturnRequestStatus_Request>({
    mutationFn: (requestBody) => rejectReturnByManager(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.rejectReturnRequest"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.returnRequests] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useApproveReturnByAdmin() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, SetReturnRequestStatus_Request>, SetReturnRequestStatus_Request>({
    mutationFn: (requestBody) => approveReturnByAdmin(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.approveReturnRequest"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.returnRequests] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useRejectReturnByAdmin() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, SetReturnRequestStatus_Request>, SetReturnRequestStatus_Request>({
    mutationFn: (requestBody) => rejectReturnByAdmin(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.rejectReturnRequest"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.returnRequests] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
