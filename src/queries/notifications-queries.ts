import { ApiError, GetAllNotifications_Response, GetMyNotifications_Response, Notification, Pagination, SendNotification_Request } from "@/types/api-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { getAllNotifications, getMyNotifications, sendNotification } from "@/lib/api";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useSendNotification() {
  const { t } = useTranslation();
  const mutation = useMutation<void, AxiosError<ApiError, SendNotification_Request>, SendNotification_Request>({
    mutationFn: (requestBody) => sendNotification(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createNotification"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetAllNotifications(pagination: Pagination) {
  const query = useQuery<GetAllNotifications_Response, AxiosError<ApiError, Pagination>, { items: Notification[]; pagination: Pagination }>({
    queryKey: [queryKeys.allNotifications],
    queryFn: () => getAllNotifications(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });
  return query;
}

export function useGetMyNotifications(pagination: Pagination) {
  const query = useQuery<GetMyNotifications_Response, AxiosError<ApiError, Pagination>, { items: Notification[]; pagination: Pagination }>({
    queryKey: [queryKeys.myNotifications],
    queryFn: () => getMyNotifications(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });
  return query;
}
