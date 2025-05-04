import { maxFileUploadSize } from "@/lib/constants";
import { formatBytes } from "@/lib/utils";
import { useCreateProduct, useUpdateProduct } from "@/queries";
import { GetProductDetails_Response } from "@/types/api-types";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    name: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_ar: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_fr: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_de: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_ru: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_ur: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_hi: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_it: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_pt: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_bn: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_nl: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_ku: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_tr: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_zh: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_sw: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    name_am: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    description: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_ar: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_fr: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_de: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_ru: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_ur: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_hi: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_it: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_pt: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_bn: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_nl: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_ku: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_tr: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_zh: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_sw: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    description_am: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    productType: z.enum(["Stem", "Bunch"], { invalid_type_error: t("forms.errors.selectOne") }).nullable(),
    categoryId: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .min(1, t("forms.errors.min1"))
      .nullable(),
    colorId: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .min(1, t("forms.errors.min1"))
      .nullable(),
    price_SAR: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .nullable(),
    price_USD: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .nullable(),
    discountId: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .optional()
      .nullable(),
    flowersPerStem: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .min(1, t("forms.errors.min1"))
      .nullable(),
    stemPerBunch: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .min(1, t("forms.errors.min1"))
      .nullable(),
    stemSizePerCM: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .nullable(),
    vaseLifePerDay: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .min(1, t("forms.errors.min1"))
      .nullable(),
    isHidden: z.boolean(),
    isFeatured: z.boolean(),
    files: z
      .array(z.instanceof(File))
      .min(2)
      .max(4)
      .refine((files) => files.every((file) => file.size <= maxFileUploadSize), `${t("forms.errors.maxFileSize")} ${formatBytes(maxFileUploadSize)}`),
  })
  .refine(({ productType }) => productType != null, { message: t("forms.errors.required"), path: ["productType"] })
  .refine(({ categoryId }) => categoryId != null, { message: t("forms.errors.required"), path: ["categoryId"] })
  .refine(({ colorId }) => colorId != null, { message: t("forms.errors.required"), path: ["colorId"] })
  .refine(({ price_SAR }) => price_SAR != null, { message: t("forms.errors.required"), path: ["price_SAR"] })
  .refine(({ price_USD }) => price_USD != null, { message: t("forms.errors.required"), path: ["price_USD"] })
  .refine(({ flowersPerStem }) => flowersPerStem != null, { message: t("forms.errors.required"), path: ["flowersPerStem"] })
  .refine(({ stemPerBunch }) => stemPerBunch != null, { message: t("forms.errors.required"), path: ["stemPerBunch"] })
  .refine(({ stemSizePerCM }) => stemSizePerCM != null, { message: t("forms.errors.required"), path: ["stemSizePerCM"] })
  .refine(({ vaseLifePerDay }) => vaseLifePerDay != null, { message: t("forms.errors.required"), path: ["vaseLifePerDay"] });

const defaultValues: FormFields = {
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
  productType: null,
  categoryId: null,
  colorId: null,
  price_SAR: null,
  price_USD: null,
  discountId: null,
  flowersPerStem: null,
  stemPerBunch: null,
  stemSizePerCM: null,
  vaseLifePerDay: null,
  isHidden: true,
  isFeatured: false,
  files: [],
};

export function useFormDataGetter(initialValues?: GetProductDetails_Response) {
  const { t } = useTranslation();
  const mutation = initialValues?.id ? useUpdateProduct() : useCreateProduct();
  const inputFields: InputField<FormFields>[] = [
    { id: "name", label: t("forms.labels.name.en"), type: "text", autoFocus: true },
    { id: "name_ar", label: t("forms.labels.name.ar"), type: "text" },
    { id: "name_fr", label: t("forms.labels.name.fr"), type: "text" },
    { id: "name_de", label: t("forms.labels.name.de"), type: "text" },
    { id: "name_ru", label: t("forms.labels.name.ru"), type: "text" },
    { id: "name_ur", label: t("forms.labels.name.ur"), type: "text" },
    { id: "name_hi", label: t("forms.labels.name.hi"), type: "text" },
    { id: "name_it", label: t("forms.labels.name.it"), type: "text" },
    { id: "name_pt", label: t("forms.labels.name.pt"), type: "text" },
    { id: "name_bn", label: t("forms.labels.name.bn"), type: "text" },
    { id: "name_nl", label: t("forms.labels.name.nl"), type: "text" },
    { id: "name_ku", label: t("forms.labels.name.ku"), type: "text" },
    { id: "name_tr", label: t("forms.labels.name.tr"), type: "text" },
    { id: "name_zh", label: t("forms.labels.name.zh"), type: "text" },
    { id: "name_sw", label: t("forms.labels.name.sw"), type: "text" },
    { id: "name_am", label: t("forms.labels.name.am"), type: "text" },
    { id: "description", label: t("forms.labels.description.en"), type: "textarea" },
    { id: "description_ar", label: t("forms.labels.description.ar"), type: "textarea" },
    { id: "description_fr", label: t("forms.labels.description.fr"), type: "textarea" },
    { id: "description_de", label: t("forms.labels.description.de"), type: "textarea" },
    { id: "description_ru", label: t("forms.labels.description.ru"), type: "textarea" },
    { id: "description_ur", label: t("forms.labels.description.ur"), type: "textarea" },
    { id: "description_hi", label: t("forms.labels.description.hi"), type: "textarea" },
    { id: "description_it", label: t("forms.labels.description.it"), type: "textarea" },
    { id: "description_pt", label: t("forms.labels.description.pt"), type: "textarea" },
    { id: "description_bn", label: t("forms.labels.description.bn"), type: "textarea" },
    { id: "description_nl", label: t("forms.labels.description.nl"), type: "textarea" },
    { id: "description_ku", label: t("forms.labels.description.ku"), type: "textarea" },
    { id: "description_tr", label: t("forms.labels.description.tr"), type: "textarea" },
    { id: "description_zh", label: t("forms.labels.description.zh"), type: "textarea" },
    { id: "description_sw", label: t("forms.labels.description.sw"), type: "textarea" },
    { id: "description_am", label: t("forms.labels.description.am"), type: "textarea" },
    {
      id: "productType",
      label: t("forms.labels.productType"),
      type: "select",
      triggerPlaceholder: t("forms.placeholders.selectOne"),
      options: [
        { label: t("types&statuses.productTypes.Stem"), value: "Stem" },
        { label: t("types&statuses.productTypes.Bunch"), value: "Bunch" },
      ],
      className: "lg:col-span-2",
    },
    { id: "categoryId", label: t("forms.labels.categoryId"), type: "number" },
    { id: "colorId", label: t("forms.labels.colorId"), type: "number" },
    { id: "price_SAR", label: t("forms.labels.price_SAR"), type: "number" },
    { id: "price_USD", label: t("forms.labels.price_USD"), type: "number" },
    { id: "discountId", label: t("forms.labels.discountId"), type: "number", className: "lg:col-span-2" },
    { id: "flowersPerStem", label: t("forms.labels.flowersPerStem"), type: "number" },
    { id: "stemPerBunch", label: t("forms.labels.stemsPerBunch"), type: "number" },
    { id: "stemSizePerCM", label: t("forms.labels.stemSize"), type: "number" },
    { id: "vaseLifePerDay", label: t("forms.labels.vaseLife"), type: "number" },
    { id: "isHidden", label: t("forms.labels.hide"), type: "switch" },
    { id: "isFeatured", label: t("forms.labels.featured"), type: "switch" },
    { id: "files", label: t("forms.labels.uploadImages"), type: "file", containerClassName: "col-span-full", maxFileSize: maxFileUploadSize, maxFilesCount: 4 },
  ];
  return { formSchema, inputFields, defaultValues: initialValues || defaultValues, mutation };
}
