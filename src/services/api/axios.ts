import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getCookie, logOut } from "@/lib/utils";
import { useEffect } from "react";
import { useRefreshToken } from "@/queries";
import i18next from "i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { badHint } from "@/services/hint";
import { encryptData } from "./crypt";

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_END_POINT}`;

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

axiosHeadersSetup();

export default function useAxios() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isPendingAuthentication, refetch: refreshAccessToken } = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => setAuthorizationHeader(config),
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            if (getCookie("refreshToken")) {
              return await refreshAccessToken().then(() => axios(setAuthorizationHeader(originalRequest)));
            } else logOut(queryClient, navigate);
          } catch (refreshError) {
            logOut(queryClient, navigate);
            return Promise.reject(refreshError);
          }
        } else if (error.response?.status === 403) badHint("You are not authorized.");
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return { axios, isPendingAuthentication };
}

export function axiosHeadersSetup() {
  axios.defaults.baseURL = apiUrl;
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept-Language"] = i18next.language;
  setAuthorizationHeader(axios.defaults);
}

function setAuthorizationHeader(instance: any) {
  const token = getCookie("accessToken");
  const utcD = new Date().toISOString();
  const encrypted = encryptData(utcD);
  instance.headers["x-datetime"] = encrypted;
  if (token) instance.headers.Authorization = `Bearer ${token}`;
  else delete instance.headers.Authorization;
  return instance;
}
