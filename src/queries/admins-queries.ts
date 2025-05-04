import { Admin, ApiError, GetAdmins_Response, Pagination } from "@/types/api-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { getAllAdmins } from "@/lib/api";

export function useGetAllAdmins(pagination: Pagination) {
	const query = useQuery<GetAdmins_Response, AxiosError<ApiError, Pagination>, { items: Admin[]; pagination: Pagination }>({
		queryKey: [queryKeys.allAdmins],
		queryFn: () => getAllAdmins(pagination),
		select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
	});
	return query;
}
