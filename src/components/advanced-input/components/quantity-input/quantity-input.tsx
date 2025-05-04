import { ToolTip } from "@/components/misc";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { handleDirectionChange } from "@/localization";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface QuantityInput_Props<TFieldValues extends FieldValues> extends Omit<ComponentProps<"input">, "accept"> {
  name: Path<TFieldValues>;
}

export const QuantityInput = forwardRef(
  <TFieldValues extends FieldValues>({ id, name, className, value, onChange, ...props }: QuantityInput_Props<TFieldValues>, ref: ForwardedRef<HTMLInputElement>) => {
    const { i18n, t } = useTranslation();
    const currentValue = (value || 0) as number;

    function changeValue(value: number) {
      onChange?.({ target: { value } } as any);
    }

    return (
      <div className="relative">
        <ToolTip
          content={t("inputPlaceHolders.counter.addOne")}
          trigger={
            <Button
              variant="ghost"
              size="icon"
              icon={PlusIcon}
              className={cn("absolute top-0", handleDirectionChange(i18n.dir(), "left-0", "right-0"))}
              onClick={() => changeValue(currentValue + 1)}
            >
              {t("inputPlaceHolders.counter.addOne")}
            </Button>
          }
        />
        <Input
          id={id || name}
          name={name}
          className={cn("px-11", className)}
          ref={ref}
          {...props}
          type="number"
          value={currentValue || ""}
          onChange={(e) => changeValue(+e.target.value)}
        />
        <ToolTip
          content={t("inputPlaceHolders.counter.reduceOne")}
          trigger={
            <Button
              variant="ghost"
              size="icon"
              icon={MinusIcon}
              className={cn("absolute top-0", handleDirectionChange(i18n.dir(), "right-0", "left-0"))}
              onClick={() => changeValue(currentValue - 1)}
            >
              {t("inputPlaceHolders.counter.reduceOne")}
            </Button>
          }
        />
      </div>
    );
  }
);
