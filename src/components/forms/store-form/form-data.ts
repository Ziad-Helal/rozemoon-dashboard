import { useCreateStore, useUpdateStore } from "@/queries";
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
    address: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_ar: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_fr: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_de: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_ru: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_ur: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_hi: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_it: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_pt: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_bn: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_nl: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_ku: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_tr: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_zh: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_sw: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    address_am: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(10, t("forms.errors.stringMin")),
    phoneNumber: z.string({ invalid_type_error: t("forms.errors.string") }).regex(/^[0-9]{3,11}$/, t("forms.errors.phone")),
    currency: z.enum(["SAR", "USD"], { invalid_type_error: t("forms.errors.selectOne") }).nullable(),
    isHidden: z.boolean(),
  })
  .refine(({ currency }) => currency != null, { message: t("forms.errors.required"), path: ["currency"] });

export function useFormDataGetter(store?: FormFields) {
  const { t } = useTranslation();
  const mutation = store ? useUpdateStore() : useCreateStore();
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
    { id: "address", label: t("forms.labels.address.en"), type: "textarea" },
    { id: "address_ar", label: t("forms.labels.address.ar"), type: "textarea" },
    { id: "address_fr", label: t("forms.labels.address.fr"), type: "textarea" },
    { id: "address_de", label: t("forms.labels.address.de"), type: "textarea" },
    { id: "address_ru", label: t("forms.labels.address.ru"), type: "textarea" },
    { id: "address_ur", label: t("forms.labels.address.ur"), type: "textarea" },
    { id: "address_hi", label: t("forms.labels.address.hi"), type: "textarea" },
    { id: "address_it", label: t("forms.labels.address.it"), type: "textarea" },
    { id: "address_pt", label: t("forms.labels.address.pt"), type: "textarea" },
    { id: "address_bn", label: t("forms.labels.address.bn"), type: "textarea" },
    { id: "address_nl", label: t("forms.labels.address.nl"), type: "textarea" },
    { id: "address_ku", label: t("forms.labels.address.ku"), type: "textarea" },
    { id: "address_tr", label: t("forms.labels.address.tr"), type: "textarea" },
    { id: "address_zh", label: t("forms.labels.address.zh"), type: "textarea" },
    { id: "address_sw", label: t("forms.labels.address.sw"), type: "textarea" },
    { id: "address_am", label: t("forms.labels.address.am"), type: "textarea" },
    { id: "phoneNumber", label: t("forms.labels.phone"), type: "tel" },
    {
      id: "currency",
      label: t("forms.labels.currency"),
      type: "select",
      triggerPlaceholder: t("forms.placeholders.selectOne"),
      options: [
        { label: t("types&statuses.currencies.SAR"), value: "SAR" },
        { label: t("types&statuses.currencies.USD"), value: "USD" },
      ],
      className: "lg:col-span-2",
    },
    { id: "isHidden", label: t("forms.labels.hide"), type: "switch", containerClassName: "col-span-full" },
  ];
  const defaultValues: FormFields = store || {
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
    address: "",
    address_ar: "",
    address_fr: "",
    address_de: "",
    address_ru: "",
    address_ur: "",
    address_hi: "",
    address_it: "",
    address_pt: "",
    address_bn: "",
    address_nl: "",
    address_ku: "",
    address_tr: "",
    address_zh: "",
    address_sw: "",
    address_am: "",
    phoneNumber: "",
    currency: null,
    isHidden: true,
  };
  return { formSchema, inputFields, defaultValues, mutation };
}
