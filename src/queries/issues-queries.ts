import { ApiError, GetAllOrdersIssues_Response, OrderIssue, Pagination, UpdateOrderIssue_Request, UpdateOrderIssue_Response } from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { useEffect } from "react";
import { badHint, goodHint } from "@/services/hint";
import { getAllOrdersIssues, updateOrderIssue } from "@/lib/api";
import { useTranslation } from "react-i18next";

export function useGetAllOrdersIssues(pagination: Pagination) {
  const query = useQuery<GetAllOrdersIssues_Response, AxiosError<ApiError, Pagination>, { items: OrderIssue[]; pagination: Pagination }>({
    queryKey: [queryKeys.allOrdersIssues],
    queryFn: () => getAllOrdersIssues(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useUpdateOrderIssue() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<UpdateOrderIssue_Response, AxiosError<ApiError, UpdateOrderIssue_Request>, UpdateOrderIssue_Request>({
    mutationFn: (requestBody) => updateOrderIssue(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateIssue"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allOrdersIssues] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
