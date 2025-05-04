import { useUpdateOrderIssue } from "@/queries";
import { IssueStatus } from "@/types/api-types";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";
export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  status: z.enum(["Pending", "InProgress", "Resolved", "Rejected"], { invalid_type_error: t("forms.errors.selectOne") }),
  adminNote: z.string({ invalid_type_error: t("forms.errors.string") }),
});

export function useFormDataGetter(defaultStatus: IssueStatus) {
  const { t } = useTranslation();
  const inputFields: InputField<FormFields>[] = [
    {
      id: "status",
      label: t("forms.labels.status"),
      type: "select",
      options: [
        { label: t("types&statuses.orderIssueStatus.Pending"), value: "Pending" },
        { label: t("types&statuses.orderIssueStatus.InProgress"), value: "InProgress" },
        { label: t("types&statuses.orderIssueStatus.Resolved"), value: "Resolved" },
        { label: t("types&statuses.orderIssueStatus.Rejected"), value: "Rejected" },
      ],
      triggerPlaceholder: t("forms.placeholders.selectOne"),
    },
    { id: "adminNote", label: t("forms.labels.notes"), type: "textarea", autoFocus: true },
  ];
  const mutation = useUpdateOrderIssue();
  const defaultValues: FormFields = {
    status: defaultStatus,
    adminNote: "",
  };
  return { formSchema, inputFields, defaultValues, mutation };
}
