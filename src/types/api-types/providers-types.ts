import { Pagination } from "@/types/api-types";

export interface PublicProvider {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  contact: string;
  notes: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Provider extends PublicProvider {
  isHidden: boolean;
  isDeleted: boolean;
}

export interface GetAllProviders_Response extends Pagination {
  items: Provider[];
}

export interface GetPublicProviders_Response extends Pagination {
  items: PublicProvider[];
}

export interface CreateProvider_Request {
  name: string;
  phone: string;
  isActive: boolean;
  email?: string;
  address?: string;
  contact?: string;
  notes?: string;
}

export interface UpdateProvider_Request extends CreateProvider_Request {
  id: number;
}

export interface ToggleProviderVisibility_Request {
  id: number;
  isHidden: boolean;
}
