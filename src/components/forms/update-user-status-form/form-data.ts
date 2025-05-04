import { useAuthenticateRegister } from "@/queries";
import { UserStatus } from "@/types/api-types";
import { InputField } from "@/types/form-types";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  docsVerifiedStatus: z.enum(["verified", "denied", "under_review", "denied_forever"], { invalid_type_error: t("forms.errors.selectOne") }),
  adminNotes: z.string({ invalid_type_error: t("forms.errors.string") }),
});

export function useFormDataGetter(status: UserStatus) {
  const { t } = useTranslation();
  const mutation = useAuthenticateRegister();

  const defaultValues: FormFields = {
    docsVerifiedStatus: status,
    adminNotes: "",
  };

  const inputFields: InputField<FormFields>[] = [
    {
      id: "docsVerifiedStatus",
      label: t("forms.labels.status"),
      type: "select",
      options: [
        { label: t("types&statuses.userStatus.Under_review"), value: "under_review" },
        { label: t("types&statuses.userStatus.Verified"), value: "verified" },
        { label: t("types&statuses.userStatus.Denied"), value: "denied" },
        { label: t("types&statuses.userStatus.Denied_forever"), value: "denied_forever" },
      ],
    },
    { id: "adminNotes", label: t("forms.labels.notes"), type: "textarea", autoFocus: true },
  ];

  return { formSchema, inputFields, defaultValues, mutation };
}
