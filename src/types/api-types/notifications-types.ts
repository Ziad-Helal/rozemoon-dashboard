import { Pagination } from "@/types/api-types";

export type NotificationType = "Info" | "Booking" | "Order" | "Wallet" | "Subscription";

export interface Notification {
  id: number;
  title: string;
  content: string;
  type: NotificationType;
  typeLocalized: string;
  isRead: boolean;
  receiverId: number;
  createdAt: Date;
}

export interface GetAllNotifications_Response extends Pagination {
  items: Notification[];
}

export interface GetMyNotifications_Response extends GetAllNotifications_Response {}

export interface SendNotification_Request {
  title: string;
  message: string;
  type: NotificationType;
  receiver: "All" | "Clients" | "Managers" | "Storekeepers" | "Cashiers" | "User";
  receiverId?: number;
  image?: File;
}
