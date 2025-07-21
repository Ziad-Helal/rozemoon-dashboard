import { Image } from "@/components";
import { DamageInvoiceProduct_Form } from "@/components/forms";
import { cn } from "@/lib/utils";
import { formatCounts, formatNumber, handleDirectionChange, Language } from "@/localization";
import { useUpdateDamageCartItems } from "@/queries";
import { useTranslation } from "react-i18next";
import type { Damage_CartItem } from "@/types/api-types";

const baseUrl = import.meta.env.VITE_API_BASE_URL + "StaticFiles/Images/";

interface DamageItem_Props {
  item: Damage_CartItem;
  isLoading: boolean;
}

export default function DamageItem({ item, isLoading }: DamageItem_Props) {
  const { t, i18n } = useTranslation();
  const { productId, name, productType, images, quantity, cartQuantity, damageReason, damageImages } = item;
  const { mutate: updateCartItems } = useUpdateDamageCartItems();

  return (
    <div className={cn("relative p-3 rounded-lg border border-foreground/50", cartQuantity > 0 && cartQuantity <= quantity ? "" : "opacity-50")}>
      <p className={cn("text-muted-foreground text-end absolute top-2", handleDirectionChange(i18n.dir(), "right-3", "left-3"))}>
        #{formatNumber(i18n.language as Language, productId, "decimal")}
      </p>
      <div className="grid gap-2 grid-cols-[auto_1fr] mb-2">
        <Image src={baseUrl + images[0].imageUrl} containerProps={{ className: "size-12 lg:size-20 rounded" }} className="object-cover" />
        <div>
          <h3 className="lg:text-2xl">{name}</h3>
          <p className="text-sm capitalize">
            <span>
              {formatCounts(
                i18n.language as Language,
                quantity,
                t(`keyWords.${productType.toLowerCase() as "stem" | "bunch"}`),
                t(`keyWords.${productType == "Stem" ? "stems" : "bunches"}`)
              )}
            </span>
          </p>
        </div>
      </div>
      <DamageInvoiceProduct_Form
        defauleValues={{ productId, quantity: cartQuantity, damageDescription: damageReason, damageImages }}
        productId={productId}
        maxQuantity={quantity}
        getValues={({ quantity, damageDescription, ...values }) => updateCartItems({ ...item, ...values, cartQuantity: quantity, damageReason: damageDescription })}
        isSubmitting={isLoading}
      />
    </div>
  );
}
