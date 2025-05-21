import { getRequest, postRequest } from "@/services/api";
import {
  ApiError,
  GetAllNotifications_Response,
  GetANotification_Request,
  GetANotification_Response,
  GetMyNotifications_Response,
  Pagination,
  SendNotification_Request,
} from "@/types/api-types";

const endpoints = {
  sendNotificationToAll: import.meta.env.VITE_API_END_POINT_SEND_NOTIFICATION_TO_ALL as string,
  sendNotificationToManagers: import.meta.env.VITE_API_END_POINT_SEND_NOTIFICATION_TO_MANAGERS as string,
  sendNotificationToStorekeepers: import.meta.env.VITE_API_END_POINT_SEND_NOTIFICATION_TO_STOREKEEPERS as string,
  sendNotificationToCashiers: import.meta.env.VITE_API_END_POINT_SEND_NOTIFICATION_TO_CASHIERS as string,
  sendNotificationToClients: import.meta.env.VITE_API_END_POINT_SEND_NOTIFICATION_TO_CLIENTS as string,
  sendNotificationToUser: import.meta.env.VITE_API_END_POINT_SEND_NOTIFICATION_TO_USER as string,
  getAllNotifications: import.meta.env.VITE_API_END_POINT_GET_ALL_NOTIFICATIONS as string,
  getMyNotifications: import.meta.env.VITE_API_END_POINT_GET_MY_NOTIFICATIONS as string,
  getANotification: import.meta.env.VITE_API_END_POINT_GET_A_NOTIFICATION as string,
};

export function sendNotification(requestBody: SendNotification_Request) {
  return postRequest<SendNotification_Request, void, ApiError>(endpoints[`sendNotificationTo${requestBody.receiver}`], requestBody, {
    headers: {
      "Content-Type": requestBody.receiver == "User" ? "application/json" : "multipart/form-data",
    },
  });
}

export function getAllNotifications(requestBody: Pagination) {
  return postRequest<Pagination, GetAllNotifications_Response, ApiError>(endpoints.getAllNotifications, requestBody);
}

export function getMyNotifications(requestBody: Pagination) {
  return postRequest<Pagination, GetMyNotifications_Response, ApiError>(endpoints.getMyNotifications, requestBody);
}

export function getANotification(requestBody: GetANotification_Request) {
  return getRequest<GetANotification_Response, ApiError>(endpoints.getANotification + requestBody.id, { params: requestBody });
}
