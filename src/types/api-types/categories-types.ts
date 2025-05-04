import { Description_Localization, Name_Localization, Pagination } from "@/types/api-types";

export interface CategoryBase {
  id: number;
  name: string;
  description: string;
}

export interface Category extends CategoryBase, Omit<Name_Localization, "name_ar">, Omit<Description_Localization, "description_ar"> {
  createdBy: number;
  numberOfProducts: number;
  isHidden: boolean;
  createdAt: Date;
}

export interface PublicCategory extends CategoryBase {}

export interface GetAllCategories_Response extends Pagination {
  items: Category[];
}

export interface GetPublicCategories_Response extends Pagination {
  items: PublicCategory[];
}

export interface CreateCategory_Request extends Name_Localization, Description_Localization {
  isHidden: boolean;
}

export interface CreateCategory_Response extends CreateCategory_Request {}

export interface ToggleCategoryVisibility_Request {
  id: number;
  ishidden: boolean;
}

export interface UpdateCategory_Request extends CreateCategory_Request {
  id: number;
}
