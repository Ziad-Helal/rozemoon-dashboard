import { Pagination } from "@/types/api-types";

export type IssueStatus = "Pending" | "InProgress" | "Resolved" | "Rejected";

export interface OrderIssue {
  issueId: number;
  orderId?: number;
  bookingId?: number;
  userId: number;
  note: string;
  adminNote: string;
  imageUrl: string;
  status: IssueStatus;
  statuslocalized: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllOrdersIssues_Response extends Pagination {
  items: OrderIssue[];
}

export interface UpdateOrderIssue_Request {
  issueId: number;
  status: IssueStatus;
  adminNote: string;
}

export interface UpdateOrderIssue_Response {
  status: string;
  message: string;
  issueId: number;
}
