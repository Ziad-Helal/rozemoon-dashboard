import { Pagination } from "../api-types";

export interface Setting {
  setting: string;
  value: string;
  description: string;
  isHidden: boolean;
}

export interface CreateSetting_Request extends Setting {}

export interface UpdateSetting_Request extends CreateSetting_Request {}

export interface GetSettings_Response extends Pagination {
  items: Setting[];
}

export interface DeleteSetting_Request {
  id: number;
}
