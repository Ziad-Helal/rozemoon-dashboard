import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatDate, resources } from "@/localization";
import { CalendarIcon } from "lucide-react";
import { FocusEventHandler, ForwardedRef, forwardRef } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Language = keyof typeof resources;

interface DateInput_Props<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  id?: string;
  value?: DateRange;
  onChange?: SelectRangeEventHandler;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  placeholder?: string;
  disabled?: boolean;
}

export const RangeDateInput = forwardRef(
  <TFieldValues extends FieldValues>({ id, name, value, onChange, onBlur, placeholder, disabled }: DateInput_Props<TFieldValues>, ref: ForwardedRef<HTMLDivElement>) => {
    const { i18n, t } = useTranslation();

    return (
      <Popover modal>
        <PopoverTrigger id={id || name} onBlur={onBlur} disabled={disabled} asChild>
          <Button variant="outline" className={cn("w-full gap-2 justify-start font-normal normal-case", !value?.from && "text-muted-foreground")} aria-label="Select a date range">
            {value?.from ? (
              value.to ? (
                <>
                  {formatDate(i18n.language as Language, value.from)} - {formatDate(i18n.language as Language, value.to)}
                </>
              ) : (
                formatDate(i18n.language as Language, value.from)
              )
            ) : (
              placeholder || t("inputPlaceHolders.date")
            )}
            <CalendarIcon className="ms-auto size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" ref={ref}>
          <Calendar mode="range" defaultMonth={value?.from} selected={value} onSelect={onChange} numberOfMonths={2} initialFocus />
        </PopoverContent>
      </Popover>
    );
  }
);
