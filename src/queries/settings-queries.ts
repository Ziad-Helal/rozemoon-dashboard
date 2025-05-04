import { ApiError, GetSettings_Response, Setting, Pagination, CreateSetting_Request, UpdateSetting_Request } from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "./query-keys";
import { createSetting, getSettings, updateSetting } from "@/lib/api";
import { badHint, goodHint } from "@/services/hint";
import { useTranslation } from "react-i18next";

export function useCreateSetting() {
  const { t } = useTranslation();
  const mutation = useMutation<void, AxiosError<ApiError, CreateSetting_Request>, CreateSetting_Request>({
    mutationFn: (requestBody) => createSetting(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.createSetting"));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}

export function useGetSettings(pagination: Pagination) {
  const query = useQuery<GetSettings_Response, AxiosError<ApiError, Pagination>, { items: Setting[]; pagination: Pagination }>({
    queryKey: [queryKeys.settings],
    queryFn: () => getSettings(pagination),
    select: ({ items, ...paginationData }) => ({ items, pagination: { ...pagination, ...paginationData, filters: { ...pagination.filters, ...paginationData.filters } } }),
  });
  return query;
}

export function useUpdateSetting() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError<ApiError, UpdateSetting_Request>, UpdateSetting_Request>({
    mutationFn: (requestBody) => updateSetting(requestBody),
    onSuccess: () => {
      goodHint(t("hints.good.updateSetting"));
      queryClient.invalidateQueries({ queryKey: [queryKeys.settings] });
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (error) badHint(error.title);
    },
  });
  return mutation;
}
