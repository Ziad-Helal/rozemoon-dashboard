import { Currency, Pagination, SuccessfulAuth_Response } from "@/types/api-types";

export type UserType = "Admin" | "Manager" | "StoreKeeper" | "Cashier" | "Customer";
export type UserStatus = "verified" | "denied" | "under_review" | "denied_forever";

export interface UserStatusObj {
  docVerified: UserStatus;
  note: string;
}

export interface AuthenticatedUser extends SuccessfulAuth_Response {
  email: string;
  branchId?: number;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
  isConfirmed: boolean;
  docsVerified: boolean;
}

interface Worker extends Omit<UserDto, "docsVerified"> {
  userType: "Admin" | "Manager" | "StoreKeeper" | "Cashier";
  createdAt: Date;
  createdBy: number;
  branchId: number;
  branchName: string;
  isDeleted: false;
}

export interface Client extends UserDto {
  userType: "Customer";
  phoneNumber: string;
  isConfirmedEmail: boolean;
  sendNotificationToEmail: boolean;
  sendNotificationToWhatsapp: boolean;
  createdAt: Date;
  updatedAt: Date;
  wallet: number;
  currency: Currency;
  countryCode: string;
  isDeleted: false;
  confirmedByAdminId: number;
  docVerifiedStatus: UserStatus;
  status: UserStatusObj;
}

export interface Admin extends Omit<UserDto, "userType" | "docsVerified"> {
  isDeleted: boolean;
  createdBy?: number;
  createdAt: Date;
}

export interface Manager extends Worker {
  userType: "Manager";
  unsatisfiedUsersCount: number;
}

export interface Storekeeper extends Worker {
  userType: "StoreKeeper";
}

export interface Cashier extends Worker {
  userType: "Cashier";
}

export interface GetRegisters_Response extends Pagination {
  items: Client[];
}

export interface GetClients_Response extends Pagination {
  items: Client[];
}

export interface GetAdmins_Response extends Pagination {
  items: Admin[];
}

export interface GetManagers_Response extends Pagination {
  items: Manager[];
}

export interface GetStorekeepers_Response extends Pagination {
  items: Storekeeper[];
}

export interface GetCashiers_Response extends Pagination {
  items: Cashier[];
}

export interface CreateUser_Request {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Exclude<UserType, "Customer">;
  branchId?: number;
}

export interface CreateUser_Response {
  id: number;
  email: string;
}

export interface UpdateUserWallet_Request {
  customerId: number;
  email: string;
  amount: number;
  notes: string;
}
