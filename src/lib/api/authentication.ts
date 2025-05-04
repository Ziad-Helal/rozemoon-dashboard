import { ApiError, ChangePassword_Request, RefreshUserToken_Request, SignIn_Request, SuccessfulAuth_Response } from "@/types/api-types";
import { postRequest } from "@/services/api";

const endpoints = {
  signIn: import.meta.env.VITE_API_END_POINT_SIGN_IN as string,
  signOut: import.meta.env.VITE_API_END_POINT_SIGN_OUT as string,
  refreshUserToken: import.meta.env.VITE_API_END_POINT_REFRESH_TOKEN as string,
  changePassword: import.meta.env.VITE_API_END_POINT_CHANGE_PASSWORD as string,
};

export function signIn(requestBody: SignIn_Request) {
  return postRequest<SignIn_Request, SuccessfulAuth_Response, string>(endpoints.signIn, requestBody);
}

// export function signOut() {
// 	return deleteRequest<void, void, ApiError>(endpoints.signOut);
// }

export function refreshUserToken(requestBody: RefreshUserToken_Request) {
  return postRequest<RefreshUserToken_Request, SuccessfulAuth_Response, ApiError>(endpoints.refreshUserToken, requestBody);
}

export function changePassword(requestBody: ChangePassword_Request) {
  return postRequest<ChangePassword_Request, string, ApiError>(endpoints.changePassword, requestBody);
}
