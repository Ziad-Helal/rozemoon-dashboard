import { getRequest, postRequest } from "@/services/api";
import { ApiError, GetProfile_Response } from "@/types/api-types";

const endpoints = {
  getAdminProfile: import.meta.env.VITE_API_END_POINT_GET_ADMIN_PROFILE as string,
  getManagerProfile: import.meta.env.VITE_API_END_POINT_GET_MANAGER_PROFILE as string,
  getStoreKeeperProfile: import.meta.env.VITE_API_END_POINT_GET_STOREKEEPER_PROFILE as string,
  getCashierProfile: import.meta.env.VITE_API_END_POINT_GET_CASHIER_PROFILE as string,
};

export function getProfile(userRole: "Admin" | "Manager" | "StoreKeeper" | "Cashier") {
  if (userRole == "Manager") return postRequest<void, GetProfile_Response, ApiError>(endpoints[`get${userRole}Profile`], undefined);
  else return getRequest<GetProfile_Response, ApiError>(endpoints[`get${userRole}Profile`]);
}
