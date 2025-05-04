import { UpdateUserWallet_Form } from "@/components/forms";
import { ChangeUserStatus, UpdateUserWallet } from "@/components/table-actions";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys } from "@/queries";
import { AuthenticatedUser, Currency, UserStatusObj } from "@/types/api-types";
import { useState } from "react";

export interface Actions_Props {
  id: number;
  email: string;
  currency: Currency;
  status: UserStatusObj;
}

export default function Actions({ id, email, currency, status }: Actions_Props) {
  const [isWalletUpdatingOpen, setIsWalletUpdatingOpen] = useState(false);
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);

  return user?.roles[0] == "Admin" ? (
    <>
      <ChangeUserStatus id={id} status={status.docVerified} />
      {status.docVerified == "verified" && (
        <UpdateUserWallet id={id} currency={currency} isOpen={isWalletUpdatingOpen} setIsOpen={setIsWalletUpdatingOpen}>
          <UpdateUserWallet_Form customerId={id} email={email} onSuccess={() => setIsWalletUpdatingOpen(false)} />
        </UpdateUserWallet>
      )}
    </>
  ) : null;
}
