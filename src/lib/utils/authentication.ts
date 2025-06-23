import { QueryClient } from "@tanstack/react-query";
import { setCookie } from "./cookies";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { routes } from "@/routes";
import { queryKeys } from "@/queries";
import { getFastOrderCartProps, getRefillCartProps } from "./cart";
import { startTransition } from "react";
import type { AuthenticatedUser, Currency, SuccessfulAuth_Response } from "@/types/api-types";
import type { NavigateFunction } from "react-router";

interface JWTUserPayload extends JwtPayload {
  email: string;
  BranchId?: number;
  Currency?: Currency;
}

export function logIn(data: SuccessfulAuth_Response): AuthenticatedUser {
  setCookie("accessToken", data.token);
  setCookie("refreshToken", data.refreshToken);
  const { email, BranchId, Currency } = jwtDecode<JWTUserPayload>(data.token);
  return { ...data, email, branchId: BranchId, currency: Currency };
}

export function logOut(queryClient: QueryClient, navigate: NavigateFunction) {
  startTransition(() => {
    setCookie("accessToken", null, -1);
    setCookie("refreshToken", null, -1);
    queryClient.setQueryData([queryKeys.userAuth], null);
    queryClient.setQueryData([queryKeys.fastOrderCart], { items: [], ...getFastOrderCartProps([]) });
    queryClient.setQueryData([queryKeys.refillCart], { items: [], ...getRefillCartProps([]) });
    navigate(routes.signIn);
  });
}
