import { Address_Localization, Currency, Name_Localization, Pagination, UserDto } from "@/types/api-types";

export interface StoreBase {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  currency: Currency;
}

export interface Store extends StoreBase {
  currencyString: string;
  isHidden: boolean;
  isDeleted: boolean;
  createdAt: Date;
  createdBy: number;
  createdByUser: Omit<UserDto, "isConfirmed" | "userType">;
}

export interface GetAllStores_Response extends Pagination {
  items: Store[];
}

export interface CreateStore_Request extends Name_Localization, Address_Localization {
  phoneNumber: string;
  currency: Currency;
  isHidden: boolean;
}

export interface CreateStore_Response extends CreateStore_Request {}

export interface UpdateStore_Request extends CreateStore_Request {
  id: number;
}

export interface GetStoreDetails_Request {
  id: number;
}

export interface GetStoreDetails_Response extends UpdateStore_Request {
  id: number;
  isDeleted: boolean;
}

export interface ToggleStoreVisibility_Request {
  id: number;
  isHidden: boolean;
}
