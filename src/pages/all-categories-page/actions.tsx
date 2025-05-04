import { Category_Form } from "@/components/forms";
import { ToggleVisibility, UpdateItem } from "@/components/table-actions";
import { formatNumber, Language } from "@/localization";
import { useToggleCategoryVisibility } from "@/queries";
import { UpdateCategory_Request } from "@/types/api-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props extends UpdateCategory_Request {}

export default function Actions(category: Actions_Props) {
  const { i18n, t } = useTranslation();
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const { mutate: toggleVisibility, isPending: isTogglingVisibility } = useToggleCategoryVisibility();

  return (
    <>
      <UpdateItem
        item="category"
        description={t("tableActions.updateItem.category") + formatNumber(i18n.language as Language, category.id, "decimal")}
        isOpen={updateIsOpen}
        setIsOpen={setUpdateIsOpen}
      >
        <Category_Form category={category} onSuccess={() => setUpdateIsOpen(false)} />
      </UpdateItem>
      <ToggleVisibility
        action={category.isHidden ? "unhide" : "hide"}
        item="category"
        onConfirm={() => toggleVisibility({ id: category.id, ishidden: !category.isHidden })}
        isLoading={isTogglingVisibility}
        disabled={isTogglingVisibility}
      />
    </>
  );
}
