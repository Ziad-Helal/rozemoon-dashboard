import { Pagination } from "@/types/api-types";

export type ReturnRequestStatus = "Pending" | "Approved" | "Rejected";

export interface ReturnRequest {
  id: number;
  orderId: number;
  productId: number;
  branchId: number;
  userId: number;
  quantity: number;
  reason: string;
  status: ReturnRequestStatus;
  statusFromAdmin: ReturnRequestStatus;
  createdAt: Date;
}

export interface GetReturnRequests_Response extends Pagination {
  items: ReturnRequest[];
}

export interface CreateReturnRequest_Request {
  orderId: number;
  productId: number;
  quantity: number;
  reason: string;
}

export type CreateReturnRequest_Response = number;

export interface SetReturnRequestStatus_Request {
  id: number;
}
