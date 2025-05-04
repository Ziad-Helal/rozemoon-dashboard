import { queryKeys } from "./query-keys";
import { ApiError, GetOrdersReviews_Response, OrderReview, Pagination } from "@/types/api-types";
import { AxiosError } from "axios";
import { getOrdersReviews } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { badHint } from "@/services/hint";

export function useGetOrdersReviews(pagination: Pagination) {
  const query = useQuery<GetOrdersReviews_Response, AxiosError<ApiError, Pagination>, { items: OrderReview[]; pagination: Pagination }>({
    queryKey: [queryKeys.ordersReviews],
    queryFn: () => getOrdersReviews(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}
