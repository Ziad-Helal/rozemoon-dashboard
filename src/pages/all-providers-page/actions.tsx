import { Provider_Form } from "@/components/forms";
import { ToggleVisibility, UpdateItem } from "@/components/table-actions";
import { formatNumber, Language } from "@/localization";
import { useToggleProviderVisibility } from "@/queries";
import { UpdateProvider_Request } from "@/types/api-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props extends UpdateProvider_Request {
  isHidden: boolean;
}

export default function Actions(provider: Actions_Props) {
  const { id, isHidden } = provider;
  const { i18n, t } = useTranslation();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { mutate: toggleVisibility, isPending: isTogglingVisibility } = useToggleProviderVisibility();

  return (
    <>
      <UpdateItem
        item="provider"
        description={t("tableActions.updateItem.provider") + formatNumber(i18n.language as Language, id, "decimal")}
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        disabled={isTogglingVisibility}
      >
        <Provider_Form provider={provider} />
      </UpdateItem>
      <ToggleVisibility
        item="provider"
        action={isHidden ? "unhide" : "hide"}
        onConfirm={() => toggleVisibility({ id, isHidden: !isHidden })}
        isLoading={isTogglingVisibility}
        disabled={isTogglingVisibility}
      />
    </>
  );
}
