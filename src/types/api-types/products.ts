import { CategoryBase, ColorBase, Description_Localization, DiscountBase, Image, Name_Localization, Pagination, StoreBase } from "@/types/api-types";

export type ProductType = "Stem" | "Bunch";

export interface ProductCore {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  productType: ProductType;
  productTypeLocalized: string;
}

interface ProductBase extends Omit<ProductCore, "price"> {
  colorId: number;
  discountPercentage: number;
  isFeatured: boolean;
  createdAt: Date;
  rating: number;
  images: Image[];
}

export interface Product extends ProductBase {
  price_SAR: number;
  price_USD: number;
  isDeleted: boolean;
  isHidden: boolean;
  countRating: number;
}

export interface PublicProduct extends ProductBase {
  price: number;
  discountId: number;
  isFavorite: false;
  inCart: false;
  numberOfReviews: number;
}

export interface StockProduct extends Omit<PublicProduct, "productTypeLocalized"> {
  productId: number;
  quantity: number;
  branchId: number;
  branch: StoreBase;
}

export interface GetAllProducts_Response extends Pagination {
  items: Product[];
}

export interface GetPublicProducts_Response extends Pagination {
  items: PublicProduct[];
}

export interface CreateProduct_Request extends Name_Localization, Description_Localization {
  productType: ProductType;
  categoryId: number;
  colorId: number;
  price_SAR: number;
  price_USD: number;
  discountId?: number;
  flowersPerStem: number;
  stemPerBunch: number;
  stemSizePerCM: number;
  vaseLifePerDay: number;
  isHidden: boolean;
  isFeatured: boolean;
  files: File[];
}

export interface CreateProduct_Response extends CreateProduct_Request {}

export interface ToggleProductVisibility_Request {
  productId: number;
  isHidden: boolean;
}

export interface UpdateProduct_Request extends CreateProduct_Request {
  id: number;
}

export interface GetProductsDetails_Request {
  id: number;
}

export interface GetProductDetails_Response extends CreateProduct_Request {
  id: number;
  productTypeLocalized: string;
  rating: number;
  numberOfRatings: number;
  images: Image[];
  files: File[];
  color: ColorBase;
  category: CategoryBase;
  discount: DiscountBase;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplyDiscount_Request {
  productId: number;
  discountId: number;
}

export interface ApplyDiscount_Response extends ApplyDiscount_Request {}

export interface RemoveDiscount_Request {
  productId: number;
}

export interface RemoveDiscount_Response extends RemoveDiscount_Request {}

export interface ChangeDiscount_Request {
  productId: number;
  discountId: number;
}
