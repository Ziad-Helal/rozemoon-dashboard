import { useCreateColor, useUpdateColor } from "@/queries";
import { UpdateColor_Request } from "@/types/api-types";
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
  hexValue: z.string({ invalid_type_error: t("forms.errors.string") }),
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
  hexValue: "",
  isHidden: true,
};

export function useFormDataGetter(initialValues?: UpdateColor_Request) {
  const { t } = useTranslation();
  const mutation = initialValues?.id ? useUpdateColor() : useCreateColor();
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
    { id: "hexValue", label: "color", type: "text", containerClassName: "col-span-full" },
    { id: "isHidden", label: "hide", type: "switch", containerClassName: "col-span-full" },
  ];
  return { formSchema, inputFields, defaultValues: initialValues || defaultValues, mutation };
}
