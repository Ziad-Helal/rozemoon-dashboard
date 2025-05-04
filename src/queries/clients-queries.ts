import { ApiError, Client, GetClients_Response, Pagination, UpdateUserWallet_Request } from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { getAllClients, updateUserWallet } from "@/lib/api";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useGetAllClients(pagination: Pagination) {
  const query = useQuery<GetClients_Response, AxiosError<ApiError, Pagination>, { items: Client[]; pagination: Pagination }>({
    queryKey: [queryKeys.allClients],
    queryFn: () => getAllClients(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });
  return query;
}

export function useUpdateUserWallet() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateUserWallet_Request>, UpdateUserWallet_Request>({
    mutationFn: (requestBody) => updateUserWallet(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateWallet"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.allClients] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
