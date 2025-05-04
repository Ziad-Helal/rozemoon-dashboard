import { LoadingSpinner } from "@/components";
import { Store_Form } from "@/components/forms";
import { ToggleVisibility, UpdateItem } from "@/components/table-actions";
import { formatNumber, Language } from "@/localization";
import { useGetStoreDetails, useToggleStoreVisibility } from "@/queries";
import { UpdateStore_Request } from "@/types/api-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface Actions_Props extends UpdateStore_Request {}

export default function Actions(store: Actions_Props) {
  const { i18n, t } = useTranslation();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { refetch, isFetching, data } = useGetStoreDetails({ id: store.id });
  const { mutateAsync: toggleStoreVisibility, isPending: isTogglingStoreVisibility } = useToggleStoreVisibility();
  console.log(store);

  useEffect(() => {
    if (isUpdateOpen) refetch();
  }, [isUpdateOpen]);

  return (
    <>
      <UpdateItem
        item="store"
        description={t("tableActions.updateItem.store") + formatNumber(i18n.language as Language, store.id, "decimal")}
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
      >
        {isFetching ? <LoadingSpinner /> : <Store_Form store={data} onSuccess={() => setIsUpdateOpen(false)} />}
      </UpdateItem>
      <ToggleVisibility
        item="store"
        action={store.isHidden ? "unhide" : "hide"}
        onConfirm={() => toggleStoreVisibility({ id: store.id, isHidden: !store.isHidden })}
        isLoading={isTogglingStoreVisibility}
        disabled={isTogglingStoreVisibility}
      />
    </>
  );
}
