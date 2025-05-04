import { Pagination, ProductCore, UserDto } from "@/types/api-types";

export interface ProductReview {
  id: number;
  rating: number;
  review: string;
  customerId: number;
  createdAt: Date;
  customer: UserDto;
  product: ProductCore;
}

export interface CompanyReview {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  isHidden: boolean;
  createdAt: Date;
  createdById: number;
  createdBy: Omit<UserDto, "userType" | "isConfirmed">;
}

export interface GetProductsReviews_Response extends Pagination {
  items: ProductReview[];
}

export interface GetCompanyReviews_Response extends Pagination {
  items: CompanyReview[];
}

export interface CreateCompanyReview_Request {
  name: string;
  message: string;
  isHidden: boolean;
  email?: string;
  phone?: string;
}

export interface CreateCompanyReview_Response extends CreateCompanyReview_Request {}

export interface UpdateCompanyReview_Request extends CreateCompanyReview_Request {
  id: number;
}

export interface ToggleCompanyReviewVisibility_Request {
  id: number;
  isHidden: boolean;
}

export interface OrderReview {
  id: number;
  orderId?: number;
  bookingRequestId?: number;
  deliveryTime: number;
  driverBehavior: number;
  condition: number;
  clientComment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetOrdersReviews_Response extends Pagination {
  items: OrderReview[];
}
