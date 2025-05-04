import { changePassword, refreshUserToken, signIn } from "@/lib/api";
import { badHint, goodHint } from "@/services/hint";
import { ApiError, AuthenticatedUser, ChangePassword_Request, RefreshUserToken_Request, SignIn_Request, SuccessfulAuth_Response } from "@/types/api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCookie, logIn, logOut } from "@/lib/utils";
import { queryKeys } from "./query-keys";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useRefreshToken() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const query = useQuery<AuthenticatedUser, AxiosError<ApiError, RefreshUserToken_Request>, AuthenticatedUser>({
    queryKey: [queryKeys.userAuth],
    queryFn: () => refreshUserToken({ refreshToken: getCookie("refreshToken")! }).then((response) => logIn(response)),
  });

  useEffect(() => {
    query.error && logOut(queryClient, navigate);
  }, [query.error]);

  return query;
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const mutation = useMutation<SuccessfulAuth_Response, AxiosError<ApiError | string, SignIn_Request>, SignIn_Request>({
    mutationFn: (requestBody) => signIn(requestBody),
    onSuccess: (data) => {
      queryClient.setQueryData([queryKeys.userAuth], logIn(data));
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (typeof error === "string") badHint(error);
      else badHint(error?.title);
    },
  });
  return mutation;
}

export function useChangePassword() {
  const mutation = useMutation<string, AxiosError<ApiError | string, ChangePassword_Request>, ChangePassword_Request>({
    mutationFn: (requestBody) => changePassword(requestBody),
    onSuccess: (response) => {
      goodHint(response);
    },
    onError: ({ response }) => {
      const error = response?.data;
      if (typeof error === "string") badHint(error);
      else badHint(error?.title);
    },
  });
  return mutation;
}
