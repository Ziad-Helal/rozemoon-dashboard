import { ApiError, GetManagers_Response, Manager, Pagination } from "@/types/api-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { getAllManagers } from "@/lib/api";

export function useGetAllManagers(pagination: Pagination) {
	const query = useQuery<GetManagers_Response, AxiosError<ApiError, Pagination>, { items: Manager[]; pagination: Pagination }>({
		queryKey: [queryKeys.allManagers],
		queryFn: () => getAllManagers(pagination),
		select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
	});
	return query;
}
