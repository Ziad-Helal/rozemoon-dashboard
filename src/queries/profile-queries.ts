import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ApiError, GetProductsDetails_Request, GetProfile_Response } from "@/types/api-types";
import { AxiosError } from "axios";
import { getProfile } from "@/lib/api";
import { useEffect } from "react";
import { badHint } from "@/services/hint";

export function useGetProfile(userRole: "Admin" | "Manager" | "StoreKeeper" | "Cashier") {
  const query = useQuery<GetProfile_Response, AxiosError<ApiError, GetProductsDetails_Request>, GetProfile_Response>({
    queryKey: [queryKeys.profile],
    queryFn: () => getProfile(userRole),
  });

  useEffect(() => {
    query.error && badHint(query.error.response?.data.title);
  }, [query.error]);

  return query;
}
