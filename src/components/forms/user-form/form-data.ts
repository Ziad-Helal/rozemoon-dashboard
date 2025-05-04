import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useCreateUser } from "@/queries";
import { AuthenticatedUser } from "@/types/api-types";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const domain = import.meta.env.VITE_DOMAIN as string;

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    firstName: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    lastName: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .trim()
      .min(1, t("forms.errors.stringMin")),
    email: z
      .string({ invalid_type_error: t("forms.errors.string") })
      .email(t("forms.errors.email"))
      .endsWith("@" + domain, t("forms.errors.endsWith") + " @" + domain),
    password: z.string({ invalid_type_error: t("forms.errors.string") }).min(6, t("forms.errors.stringMin")),
    role: z.enum(["Admin", "Manager", "StoreKeeper", "Cashier"], { invalid_type_error: t("forms.errors.selectOne") }).nullable(),
    branchId: z
      .number({ invalid_type_error: t("forms.errors.number") })
      .positive(t("forms.errors.positive"))
      .nullable(),
  })
  .refine(({ role }) => role != null, { message: t("forms.errors.required"), path: ["role"] })
  .refine(({ role, branchId }) => role != "Admin" || branchId == null, { message: t("forms.errors.required"), path: ["branchId"] });

export function useFormDataGetter() {
  const { t } = useTranslation();
  const mutation = useCreateUser();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const inputFields: InputField<FormFields>[] = [
    { id: "firstName", label: t("forms.labels.firstName"), type: "text", autoFocus: true },
    { id: "lastName", label: t("forms.labels.lastName"), type: "text" },
    { id: "email", label: t("forms.labels.email"), type: "email" },
    { id: "password", label: t("forms.labels.password"), type: "password" },
    {
      id: "role",
      label: t("forms.labels.userRole"),
      type: "select",
      options: [
        { label: t("keyWords.admin"), value: "Admin" },
        { label: t("keyWords.manager"), value: "Manager" },
        { label: t("keyWords.storeKeeper"), value: "StoreKeeper" },
        { label: t("keyWords.cashier"), value: "Cashier" },
      ],
      triggerPlaceholder: t("forms.placeholders.selectOne"),
      containerClassName: "col-span-full",
    },
    { id: "branchId", label: t("forms.labels.storeId"), type: "number", containerClassName: "col-span-full hidden" },
  ];
  const defaultValues: FormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: domain,
    role: null,
    branchId: user?.branchId ? +user.branchId : null,
  };

  return { formSchema, inputFields, defaultValues, mutation };
}
