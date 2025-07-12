import { Dialog } from "@/components";
import { SelectInput } from "@/components/advanced-input/components";
import { GuestUser_Form } from "@/components/forms";
import { Button, Label } from "@/components/ui";
import { useDebounce } from "@/hooks/misc";
import { useGetAllClients } from "@/queries";
import { UserPlus2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { FormFields } from "@/components/forms/guest-user-form/form-data";
import type { CreateGuestUser_Request } from "@/types/api-types";

interface OrderUser_Props {
  setOrderUser: Dispatch<SetStateAction<Partial<CreateGuestUser_Request> | undefined>>;
  user?: Omit<CreateGuestUser_Request, "customerId">;
}

export default function OrderUser({ user, setOrderUser }: OrderUser_Props) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data, isFetching, refetch } = useGetAllClients(
    {
      pageNumber: 1,
      pageSize: 5,
      filters: {
        // firstName: isNaN(+debouncedSearch[0]) ? debouncedSearch : undefined,
        // lastName: isNaN(+debouncedSearch[0]) ? debouncedSearch : undefined,
        name: debouncedSearch && isNaN(+debouncedSearch[0]) ? debouncedSearch : undefined,
        phoneNumber: debouncedSearch && isNaN(+debouncedSearch[0]) ? undefined : debouncedSearch,
      },
    },
    true
  );

  function searchHandler(search: string) {
    setSearch(search);
  }

  function changeHandler(value: string) {
    setOrderUser(value ? { customerId: +value, guestName: undefined, guestPhoneCode: undefined, guestPhoneNumber: undefined } : undefined);
  }

  function addNewUserHandler(values: FormFields) {
    setOrderUser({ customerId: undefined, ...values, guestPhoneNumber: values.guestPhoneNumber[0] == "0" ? values.guestPhoneNumber.slice(1) : values.guestPhoneNumber });
    setIsOpen(false);
  }

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  return (
    <div className="flex gap-2 items-end">
      <div className="flex-1">
        <Label htmlFor="user">{t("pages.cart.orderUser.label")}</Label>
        <SelectInput
          id="user"
          name="user"
          searchQuery={search}
          options={data?.items.map((item) => ({ label: `${item.firstName} ${item.lastName} | ${item.phoneNumber}`, value: item.id.toString() }))}
          onSearch={searchHandler}
          onChange={changeHandler}
          isLoading={isFetching}
        />
      </div>
      <Dialog
        title={t("pages.cart.orderUser.title")}
        description={t("pages.cart.orderUser.description")}
        trigger={
          <Button variant="outline" size="icon" icon={UserPlus2Icon}>
            {t("pages.cart.orderUser.title")}
          </Button>
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <GuestUser_Form user={user} onSubmit={addNewUserHandler} />
      </Dialog>
    </div>
  );
}
