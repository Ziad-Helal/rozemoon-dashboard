import { ApiError, GetStorekeepers_Response, Pagination, Storekeeper } from "@/types/api-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { getAllStorekeepers, getStoreStorekeepers } from "@/lib/api";

export function useGetAllStorekeepers(pagination: Pagination) {
	const query = useQuery<GetStorekeepers_Response, AxiosError<ApiError, Pagination>, { items: Storekeeper[]; pagination: Pagination }>({
		queryKey: [queryKeys.allStorekeepers],
		queryFn: () => getAllStorekeepers(pagination),
		select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
	});
	return query;
}

export function useGetStoreStorekeepers(pagination: Pagination) {
	const query = useQuery<Storekeeper, AxiosError<ApiError, Pagination>, { items: Storekeeper[]; pagination: Pagination }>({
		queryKey: [queryKeys.storeStorekeepers],
		queryFn: () => getStoreStorekeepers(),
		select: (item) => ({ items: [item], pagination }),
	});
	return query;
}
