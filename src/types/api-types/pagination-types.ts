import { Currency, FastOrderStatus, IssueStatus, PaymentMethod, ScheduledOrderStatus, SortDirection, UserStatus } from "@/types/api-types";

export interface Pagination {
  pageNumber?: number;
  pageSize?: number;
  totalCount?: number;
  totalPages?: number;
  hasPrevious?: boolean;
  hasNext?: boolean;
  search?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  filters?: PaginationFilters;
  currency?: Currency;
  minPrice?: number;
  maxPrice?: number;
  maxRatting?: 1 | 2 | 3 | 4 | 5;
  from?: string;
  to?: string;
  branchId?: number;
  status?: FastOrderStatus | ScheduledOrderStatus | IssueStatus;
  payment_Method?: PaymentMethod;
  orderId?: number;
  uyserId?: number;
  orderOrBooking?: string;
  bookingRequestId?: number;
  minDeliveryTime?: number;
  maxDeliveryTime?: number;
  minDriverBehavior?: number;
  maxDriverBehavior?: number;
  minCondition?: number;
  maxCondition?: number;
}

export interface PaginationFilters {
  setting?: string;
  docsVerified?: "true" | "false";
  isHidden?: "true" | "false";
  docVerifiedStatus?: UserStatus;
}
