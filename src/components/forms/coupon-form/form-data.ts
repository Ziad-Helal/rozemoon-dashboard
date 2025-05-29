import { useCreateCoupon, useUpdateCoupon } from "@/queries";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { z } from "zod";
import type { InputField } from "@/types/form-types";

const defaultInputValues = {
  couponString: "",
  percentage: 0,
  maxAmountSar: null,
  maxAmountUsd: null,
  // maxNumOfRedeemsPerUser: null,
  // maxRedeems: null,
  isForOrder: true,
  isForBooking: true,
  isActivated: true,
  expiryDateTime: null,
};

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  couponString: z
    .string({ invalid_type_error: t("forms.errors.string") })
    .trim()
    .min(1, t("forms.errors.stringMin")),
  percentage: z
    .number({ invalid_type_error: t("forms.errors.number") })
    .positive(t("forms.errors.positive"))
    .max(100, t("forms.errors.max")),
  maxAmountSar: z
    .number({ invalid_type_error: t("forms.errors.number") })
    .min(0, t("forms.errors.min0"))
    .nullable(),
  maxAmountUsd: z
    .number({ invalid_type_error: t("forms.errors.number") })
    .min(0, t("forms.errors.min0"))
    .nullable(),
  // maxNumOfRedeemsPerUser: z
  //   .number({ invalid_type_error: t("forms.errors.number") })
  //   .min(0, t("forms.errors.min0"))
  //   .nullable(),
  // maxRedeems: z
  //   .number({ invalid_type_error: t("forms.errors.number") })
  //   .min(0, t("forms.errors.min0"))
  //   .nullable(),
  isForOrder: z.boolean(),
  isForBooking: z.boolean(),
  isActivated: z.boolean(),
  expiryDateTime: z.date().nullable(),
});

export function useFormDataGetter(initialValues?: FormFields) {
  const { t } = useTranslation();
  const mutation = initialValues ? useUpdateCoupon() : useCreateCoupon();
  const inputFields: InputField<FormFields>[] = [
    { id: "couponString", label: t("forms.labels.couponString"), type: "text", autoFocus: true },
    { id: "percentage", label: t("forms.labels.discountPercentage"), type: "number" },
    { id: "maxAmountSar", label: t("forms.labels.maxSAR"), type: "number" },
    { id: "maxAmountUsd", label: t("forms.labels.maxUSD"), type: "number" },
    // { id: "maxNumOfRedeemsPerUser", label: t("forms.labels.redeemsPerUser"), type: "number" },
    // { id: "maxRedeems", label: t("forms.labels.allRedeems"), type: "number" },
    { id: "isForOrder", label: t("forms.labels.redeemFastOrder"), type: "switch" },
    { id: "isForBooking", label: t("forms.labels.redeemScheduledOrder"), type: "switch" },
    { id: "isActivated", label: t("forms.labels.activate"), type: "switch", containerClassName: "col-span-full" },
    { id: "expiryDateTime", label: t("forms.labels.expirationDate"), type: "date", containerClassName: "col-span-full" },
  ];
  const defaultValues: FormFields = initialValues ? { ...defaultInputValues, ...initialValues } : defaultInputValues;

  return { formSchema, inputFields, defaultValues, mutation };
}
