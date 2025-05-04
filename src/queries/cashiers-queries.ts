import { ApiError, Cashier, GetCashiers_Response, Pagination } from "@/types/api-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { getAllCashiers, getStoreCashiers } from "@/lib/api";

export function useGetAllCashiers(pagination: Pagination) {
	const query = useQuery<GetCashiers_Response, AxiosError<ApiError, Pagination>, { items: Cashier[]; pagination: Pagination }>({
		queryKey: [queryKeys.allCashiers],
		queryFn: () => getAllCashiers(pagination),
		select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
	});
	return query;
}

export function useGetStoreCashiers(pagination: Pagination) {
	const query = useQuery<GetCashiers_Response, AxiosError<ApiError, Pagination>, { items: Cashier[]; pagination: Pagination }>({
		queryKey: [queryKeys.storeCashiers],
		queryFn: () => getStoreCashiers(pagination),
		select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
	});
	return query;
}
