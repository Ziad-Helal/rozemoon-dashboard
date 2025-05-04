import { queryKeys } from "./query-keys";
import { ApiError, GetProductsReviews_Response, Pagination, ProductReview } from "@/types/api-types";
import { AxiosError } from "axios";
import { getProductsReviews } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { badHint } from "@/services/hint";

export function useGetProductsReviews(pagination: Pagination) {
	const query = useQuery<GetProductsReviews_Response, AxiosError<ApiError, Pagination>, { items: ProductReview[]; pagination: Pagination }>({
		queryKey: [queryKeys.productsReviews],
		queryFn: () => getProductsReviews(pagination),
		select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
	});

	useEffect(() => {
		query.error && badHint(query.error.response?.data.title);
	}, [query.error]);

	return query;
}
