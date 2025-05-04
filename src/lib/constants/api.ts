import { Pagination } from "@/types/api-types";

export const maxFileUploadSize = 1024 * 1024 * 5;

export const defaultPageSize = 10;

const pageSize = localStorage.getItem("pageSize");
export const defaultPagination: Pagination = {
  pageNumber: 1,
  pageSize: pageSize ? +pageSize! : defaultPageSize,
  totalCount: 0,
  totalPages: 0,
  hasPrevious: false,
  hasNext: false,
};

export const emptyProduct = {
  name: "",
  name_ar: "",
  name_fr: "",
  name_de: "",
  name_ru: "",
  name_ur: "",
  name_hi: "",
  name_it: "",
  name_pt: "",
  name_bn: "",
  name_nl: "",
  name_ku: "",
  name_tr: "",
  name_zh: "",
  name_sw: "",
  name_am: "",
  description: "",
  description_ar: "",
  description_fr: "",
  description_de: "",
  description_ru: "",
  description_ur: "",
  description_hi: "",
  description_it: "",
  description_pt: "",
  description_bn: "",
  description_nl: "",
  description_ku: "",
  description_tr: "",
  description_zh: "",
  description_sw: "",
  description_am: "",
  productType: "",
  categoryId: "",
  colorId: "",
  price_SAR: "",
  price_USD: "",
  discountId: "",
  flowersPerStem: "",
  stemPerBunch: "",
  stemSizePerCM: "",
  vaseLifePerDay: "",
  isFeatured: "",
  isHidden: "",
};
