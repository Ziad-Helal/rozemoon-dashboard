import { useEffect, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Pagination } from "@/types/api-types";
import { useEffectAfterMount } from "@/hooks/misc";
import { useTranslation } from "react-i18next";

interface UseDataGetter_Args<TData, TError> {
  defaultPagination: Pagination;
  query: (pagination: Pagination) => UseQueryResult<TData, TError>;
  refetchOnLanguageChange?: boolean;
}

export default function useDataGetter<TData, TError>({ defaultPagination, query, refetchOnLanguageChange }: UseDataGetter_Args<TData, TError>) {
  const { i18n } = useTranslation();
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);
  const { data, isFetching, refetch } = query(pagination);

  useEffect(() => {
    refetch();
  }, [pagination]);

  useEffectAfterMount(() => {
    refetchOnLanguageChange && refetch();
  }, [i18n.language]);

  return {
    data,
    isLoading: isFetching,
    setPagination,
    refetch,
  };
}
