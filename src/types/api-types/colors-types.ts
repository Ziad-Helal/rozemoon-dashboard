import { Name_Localization, Pagination } from "@/types/api-types";

export interface ColorBase {
  id: number;
  name: string;
  hexValue: string;
}

export interface Color extends ColorBase, Name_Localization {
  nameLocalized: string;
  numberOfProducts: number;
  isHidden: boolean;
  createdAt: Date;
}

export interface PublicColor extends ColorBase {}

export interface GetAllColors_Response extends Pagination {
  items: Color[];
}

export interface GetPublicColors_Response extends Pagination {
  items: PublicColor[];
}

export interface CreateColor_Request extends Name_Localization {
  hexValue: string;
  isHidden: boolean;
}

export interface CreateColor_Response extends CreateColor_Request {}

export interface ToggleColorVisibility_Request {
  id: number;
  ishidden: boolean;
}

export interface UpdateColor_Request extends CreateColor_Request {
  id: number;
}
