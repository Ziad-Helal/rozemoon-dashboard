import { ToolTip } from "@/components";
import { Button, FormControl, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { handleDirectionChange } from "@/localization";
import { Eye, EyeClosedIcon } from "lucide-react";
import { ComponentProps, ForwardedRef, forwardRef, useState } from "react";
import { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface PasswordInput_Props<TFieldValues extends FieldValues> extends Omit<ComponentProps<"input">, "accept"> {
  name: Path<TFieldValues>;
}

export const PasswordInput = forwardRef(
  <TFieldValues extends FieldValues>({ id, name, className, disabled, ...props }: PasswordInput_Props<TFieldValues>, ref: ForwardedRef<HTMLInputElement>) => {
    const { i18n, t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    return (
      <FormControl>
        <div className="relative">
          <Input id={id || name} name={name} className={cn("pe-11", className)} disabled={disabled} ref={ref} {...props} type={showPassword ? "text" : "password"} />
          <ToolTip
            content={t("inputPlaceHolders.password.showPassword")}
            trigger={
              <Button
                size="icon"
                variant="ghost"
                icon={showPassword ? EyeClosedIcon : Eye}
                iconClassName="!size-4"
                aria-label="Toggle password visibility"
                className={cn("size-7 absolute top-1/2 -translate-y-1/2", handleDirectionChange(i18n.dir(), "right-1", "left-1"))}
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                disabled={disabled}
              >
                {t("inputPlaceHolders.password.showPassword")}
              </Button>
            }
          />
        </div>
      </FormControl>
    );
  }
);
