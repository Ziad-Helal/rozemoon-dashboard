import { UserStatus, UserType } from "./user-types";

export interface SignIn_Request {
  email: string;
  password: string;
}

export interface RefreshUserToken_Request {
  refreshToken: string;
}

export interface SuccessfulAuth_Response {
  userId: number;
  roles: [UserType];
  token: string;
  refreshToken: string;
  tokenExpiryInMinutes: number;
  isConfirmed: boolean;
  docsVerified: boolean;
}

export interface RegisterAuthentication_Request {
  userId: number;
  docsVerifiedStatus: UserStatus;
  adminNotes: string;
}

export interface GetRegisterDocuments_Request {
  userId: number;
}

export interface ChangePassword_Request {
  currentPassword: string;
  newPassword: string;
}
