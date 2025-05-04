import { UpdateOrderIssue_Form } from "@/components/forms";
import { Expand_Issue, UpdateItem } from "@/components/table-actions";
import { formatNumber, Language } from "@/localization";
import { IssueStatus } from "@/types/api-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props {
  issueId: number;
  status: IssueStatus;
  imageUrl: string;
  note: string;
}

export default function Actions({ issueId, status, imageUrl, note }: Actions_Props) {
  const { i18n, t } = useTranslation();
  const [updateIsOpen, setUpdateIsOpen] = useState(false);

  return (
    <>
      <Expand_Issue issueId={issueId} imageUrl={imageUrl} note={note} />
      <UpdateItem
        item="issue"
        description={t("tableActions.updateItem.issue") + formatNumber(i18n.language as Language, issueId, "decimal")}
        isOpen={updateIsOpen}
        setIsOpen={setUpdateIsOpen}
      >
        <UpdateOrderIssue_Form issueId={issueId} status={status} onSuccess={() => setUpdateIsOpen(false)} />
      </UpdateItem>
    </>
  );
}
