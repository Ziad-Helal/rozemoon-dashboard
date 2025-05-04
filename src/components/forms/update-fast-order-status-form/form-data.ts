import { useUpdateFastOrderStatus } from "@/queries";
import { FastOrderStatus } from "@/types/api-types";
import { InputField } from "@/types/form-types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export type FormFields = z.infer<typeof formSchema>;

const formSchema = z.object({
  status: z.enum(["Pending", "Delivering", "Delivered", "Returned", "PartiallyReturned", "HasIssue", "NotPaied", "Charged", "Cancelled", "DeliveredConfirmed", "IssueReported"], {
    invalid_type_error: t("forms.errors.selectOne"),
  }),
});
8;
export function useFormDataGetter(status: FastOrderStatus) {
  const { t } = useTranslation();
  const mutation = useUpdateFastOrderStatus();
  const inputFields: InputField<FormFields>[] = [
    {
      id: "status",
      type: "select",
      triggerPlaceholder: t("forms.placeholders.selectOne"),
      options: [
        { label: t("types&statuses.fastOrderStatus.Pending"), value: "Pending", disabled: true },
        { label: t("types&statuses.fastOrderStatus.Delivering"), value: "Delivering" },
        { label: t("types&statuses.fastOrderStatus.Delivered"), value: "Delivered" },
        { label: t("types&statuses.fastOrderStatus.DeliveredConfirmed"), value: "DeliveredConfirmed", disabled: true },
        { label: t("types&statuses.fastOrderStatus.Returned"), value: "Returned", disabled: true },
        { label: t("types&statuses.fastOrderStatus.PartiallyReturned"), value: "PartiallyReturned", disabled: true },
        { label: t("types&statuses.fastOrderStatus.NotPaied"), value: "NotPaied" },
        { label: t("types&statuses.fastOrderStatus.Charged"), value: "Charged", disabled: true },
        { label: t("types&statuses.fastOrderStatus.Cancelled"), value: "Cancelled", disabled: true },
        { label: t("types&statuses.fastOrderStatus.HasIssue"), value: "HasIssue" },
        { label: t("types&statuses.fastOrderStatus.IssueReported"), value: "IssueReported", disabled: true },
      ],
      autoFocus: true,
    },
  ];
  const defaultValues: FormFields = {
    status,
  };

  return { formSchema, inputFields, defaultValues, mutation };
}
