import { Color_Form } from "@/components/forms";
import { ToggleVisibility, UpdateItem } from "@/components/table-actions";
import { formatNumber, Language } from "@/localization";
import { useToggleColorVisibility } from "@/queries";
import { UpdateColor_Request } from "@/types/api-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props extends UpdateColor_Request {}

export default function Actions(color: Actions_Props) {
  const { i18n, t } = useTranslation();
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const { mutate: toggleVisibility, isPending: isTogglingVisibility } = useToggleColorVisibility();

  return (
    <>
      <UpdateItem
        item="color"
        description={t("tableActions.updateItem.color") + formatNumber(i18n.language as Language, color.id, "decimal")}
        isOpen={updateIsOpen}
        setIsOpen={setUpdateIsOpen}
      >
        <Color_Form color={color} onSuccess={() => setUpdateIsOpen(false)} />
      </UpdateItem>
      <ToggleVisibility
        action={color.isHidden ? "unhide" : "hide"}
        item="color"
        onConfirm={() => toggleVisibility({ id: color.id, ishidden: !color.isHidden })}
        isLoading={isTogglingVisibility}
        disabled={isTogglingVisibility}
      />
    </>
  );
}
