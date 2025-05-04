import { Setting_Form } from "@/components/forms";
import { UpdateItem } from "@/components/table-actions";
import { Setting } from "@/types/api-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props extends Setting {}

export default function Actions(setting: Actions_Props) {
  const { t } = useTranslation();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  return (
    <UpdateItem item="setting" description={t("tableActions.updateItem.setting") + setting.setting} isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen}>
      <Setting_Form setting={setting} onSuccess={() => setIsUpdateOpen(false)} />
    </UpdateItem>
  );
}
