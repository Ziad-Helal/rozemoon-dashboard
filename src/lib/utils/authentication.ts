import { QueryClient } from "@tanstack/react-query";
import { setCookie } from "./cookies";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { SuccessfulAuth_Response } from "@/types/api-types";
import type { NavigateFunction } from "react-router";
import { routes } from "@/routes";
import { queryKeys } from "@/queries";
import { getFastOrderCartProps, getRefillCartProps } from "./cart";

interface JWTUserPayload extends JwtPayload {
  email: string;
  BranchId?: number;
}

export function logIn(data: SuccessfulAuth_Response) {
  setCookie("accessToken", data.token);
  setCookie("refreshToken", data.refreshToken);
  const { email, BranchId } = jwtDecode<JWTUserPayload>(data.token);
  return { ...data, email, branchId: BranchId };
}

export function logOut(queryClient: QueryClient, navigate: NavigateFunction) {
  setCookie("accessToken", null, -1);
  setCookie("refreshToken", null, -1);
  queryClient.setQueryData([queryKeys.userAuth], null);
  queryClient.setQueryData([queryKeys.fastOrderCart], { items: [], ...getFastOrderCartProps([]) });
  queryClient.setQueryData([queryKeys.refillCart], { items: [], ...getRefillCartProps([]) });
  navigate(routes.signIn);
}
