import { UserType } from "@/types/api-types";

export interface GetProfile_Response {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isConfirmed: boolean;
  isDeleted: boolean;
  createdBy: number;
  createdAt: Date;
  updatedAt?: Date;
  phoneNumber?: string;
  userType?: UserType;
  branchId?: number;
  branchName?: string;
  unsatisfiedUsersCount?: number;
}
