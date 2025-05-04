import { useCreateCategory, useUpdateCategory } from "@/queries";
import { UpdateCategory_Request } from "@/types/api-types";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
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
  isHidden: z.boolean(),
});

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
  isHidden: true,
};

export function useFormDataGetter(initialValues?: UpdateCategory_Request) {
  const { t } = useTranslation();
  const mutation = initialValues?.id ? useUpdateCategory() : useCreateCategory();
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
    { id: "isHidden", label: t("forms.labels.hide"), type: "switch", containerClassName: "col-span-full" },
  ];
  return { formSchema, inputFields, defaultValues: initialValues || defaultValues, mutation };
}
