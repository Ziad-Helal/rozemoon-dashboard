import { DamageInvoice_Form } from "@/components/forms";
import { Form_Page } from "@/components/layouts";
import { Button } from "@/components/ui";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useCreateDamageInvoice, useUpdateDamageCart } from "@/queries";
import { badHint } from "@/services/hint";
import { useTranslation } from "react-i18next";
import { DamageItem } from "./components";
import type { Damage_Cart } from "@/types/api-types";

export default function DamageCart_Page() {
  const { t } = useTranslation();
  const damageCart = useQuerySubscribe<Damage_Cart>([queryKeys.damageCart])!;
  const { mutate: updateCart } = useUpdateDamageCart();
  const { mutateAsync, isPending } = useCreateDamageInvoice();

  function submitHandler() {
    if (damageCart.items.length) mutateAsync(damageCart);
    else badHint(t("hints.good.invoiceWithNoProdcts"));
  }

  return (
    <Form_Page heading="damage basket">
      {damageCart.items.length ? (
        <>
          <DamageInvoice_Form getValues={(values) => updateCart({ reason: values.reason, damagedImages: values.damagedImages })} isSubmitting={isPending} />
          <div className="bg-secondary/25 p-2 mt-3 space-y-3 rounded-xl">
            {damageCart.items.map((item) => (
              <DamageItem key={item.id} item={item} isLoading={isPending} />
            ))}
          </div>
          <Button onClick={submitHandler} isLoading={isPending}>
            {t("forms.submit")}
          </Button>
        </>
      ) : (
        <p className="text-center text-muted-foreground">{t("pages.cart.empty")}</p>
      )}
    </Form_Page>
  );
}
