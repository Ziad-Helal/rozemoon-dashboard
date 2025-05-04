import { authenticateRegister, getRegisterDocuments, getRegisters } from "@/lib/api";
import { badHint, goodHint } from "@/services/hint";
import { ApiError, Client, Document, GetRegisterDocuments_Request, GetRegisters_Response, Pagination, RegisterAuthentication_Request } from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";

export function useGetRegisters(pagination: Pagination) {
  const query = useQuery<GetRegisters_Response, AxiosError<ApiError, Pagination>, { items: Client[]; pagination: Pagination }>({
    queryKey: [queryKeys.registers],
    queryFn: () => getRegisters(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });
  return query;
}

export function useAuthenticateRegister() {
  const queryClient = useQueryClient();
  const mutation = useMutation<string, AxiosError<ApiError, RegisterAuthentication_Request>, RegisterAuthentication_Request>({
    mutationFn: (requestBody: RegisterAuthentication_Request) => authenticateRegister(requestBody),
    onSuccess: (response) => {
      //   docsVerifiedStatus && queryClient.setQueryData([queryKeys.registers], (data: GetRegisters_Response) => ({ ...data, items: data?.items.filter(({ id }) => id != userId) }));
      queryClient.invalidateQueries({ queryKey: [queryKeys.registers] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.allClients] });
      goodHint(response);
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetRegisterDocuments() {
  const mutation = useMutation<Document[], AxiosError<ApiError, GetRegisterDocuments_Request>, GetRegisterDocuments_Request>({
    mutationFn: (requestBody: GetRegisterDocuments_Request) => getRegisterDocuments(requestBody),
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
