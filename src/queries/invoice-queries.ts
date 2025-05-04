import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ApiError, GetProductsDetails_Request } from "@/types/api-types";
import { AxiosError } from "axios";
import { getFastOrderInvoice, getScheduledOrderInvoice } from "@/lib/api";
import { useEffect } from "react";
import { badHint } from "@/services/hint";

export function useGetFastOrderInvoice(requestBody: GetProductsDetails_Request) {
  const query = useQuery<Blob[], AxiosError<ApiError, GetProductsDetails_Request>, Blob[]>({
    queryKey: [queryKeys.invoice, requestBody.id],
    queryFn: () => getFastOrderInvoice(requestBody).then((response) => [response]),
    enabled: false,
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}

export function useGetScheduledOrderInvoice(requestBody: GetProductsDetails_Request) {
  const query = useQuery<Blob[], AxiosError<ApiError, GetProductsDetails_Request>, Blob[]>({
    queryKey: [queryKeys.invoice, requestBody.id],
    queryFn: () => getScheduledOrderInvoice(requestBody).then((response) => [response]),
    enabled: false,
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}
