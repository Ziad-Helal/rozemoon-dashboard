import { Dialog, LoadingSpinner } from "@/components";
import { ChangePassword_Form } from "@/components/forms";
import { Button, Separator } from "@/components/ui";
import { useQuerySubscribe } from "@/hooks/misc";
import { formatDate, formatNumber, Language } from "@/localization";
import { queryKeys, useGetProfile } from "@/queries";
import { AuthenticatedUser, UserType } from "@/types/api-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Profile_Page() {
  const { i18n, t } = useTranslation();
  const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);
  const { data, isFetching: isLoading, refetch } = useGetProfile(user!.roles[0] as Exclude<UserType, "Customer">);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section className="[&>p:not(:first-child)]:mt-2">
      {isLoading ? (
        <LoadingSpinner loadingText={t("pages.profile.loading")} isFullPage />
      ) : (
        <>
          <p>
            <span className="capitalize">{t("pages.profile.name")}:</span> {data!.firstName} {data!.lastName}
          </p>
          <p>
            <span className="capitalize">{t("pages.profile.email")}:</span> {data!.email}
          </p>
          {data!.phoneNumber && (
            <p>
              <span className="capitalize">{t("pages.profile.phoneNumber")}:</span> {data!.phoneNumber}
            </p>
          )}
          {data!.unsatisfiedUsersCount && (
            <p>
              <span className="capitalize">{t("pages.profile.activeReturnedOrders")}:</span> {formatNumber(i18n.language as Language, data!.unsatisfiedUsersCount, "decimal")}
            </p>
          )}
          <p>
            <span className="capitalize">{t("pages.profile.createdAt")}:</span> {formatDate(i18n.language as Language, data!.createdAt)}
          </p>
          {data!.branchId && (
            <p>
              <span className="capitalize">{t("pages.profile.store")}:</span> {formatNumber(i18n.language as Language, data!.branchId, "decimal")} {data!.branchName}
            </p>
          )}
          <Separator className="my-4" />
          <Dialog
            title={t("pages.profile.password.title")}
            description={t("pages.profile.password.description")}
            trigger={<Button variant="secondary">{t("pages.profile.password.title")}</Button>}
            isOpen={isOpenChangePassword}
            setIsOpen={setIsOpenChangePassword}
          >
            <ChangePassword_Form onSuccess={() => setIsOpenChangePassword(false)} />
          </Dialog>
        </>
      )}
    </section>
  );
}
