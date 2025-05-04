import { LoadingSpinner } from "@/components/misc";
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { useEffectAfterMount } from "@/hooks/misc";
import { cn } from "@/lib/utils";
import { Language, tryFormattingNumber } from "@/localization";
import { SelectOption } from "@/types/form-types";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { FocusEventHandler, ForwardedRef, forwardRef, useLayoutEffect, useRef, useState } from "react";
import { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SelectInput_Props<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  id?: string;
  value?: string;
  options?: SelectOption[];
  onChange?: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  triggerClassName?: string;
  triggerPlaceholder?: string;
  searchPlaceholder?: string;
  emptyPlaceholder?: string;
  loadingPlaceholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const SelectInput = forwardRef(
  <TFieldValues extends FieldValues>(
    {
      id,
      name,
      value,
      onChange,
      onBlur,
      options,
      triggerClassName,
      triggerPlaceholder,
      searchPlaceholder,
      emptyPlaceholder,
      loadingPlaceholder,
      disabled,
      isLoading,
    }: SelectInput_Props<TFieldValues>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || "");

    const triggerRef = useRef<HTMLButtonElement>(null);
    const [triggerWidth, setTriggerWidth] = useState(0);

    useEffectAfterMount(() => {
      onChange?.(selectedValue);
    }, [selectedValue]);

    useLayoutEffect(() => {
      if (triggerRef.current) {
        const resizeObserver = new ResizeObserver((entries) => {
          for (let entry of entries) {
            if (entry.target === triggerRef.current && entry.target instanceof HTMLElement) {
              setTriggerWidth(entry.target.offsetWidth);
            }
          }
        });

        resizeObserver.observe(triggerRef.current);

        return () => {
          resizeObserver.disconnect();
        };
      }
    }, []);

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen} modal>
        <PopoverTrigger id={id || name} name={name} onBlur={onBlur} disabled={disabled} asChild>
          <Button variant="outline" role="combobox" aria-expanded={isOpen} className={cn("w-full justify-between", triggerClassName)} ref={triggerRef}>
            {options ? (selectedValue ? tryFormattingNumber(i18n.language as Language, options.find(({ value }) => value === selectedValue)?.label) : triggerPlaceholder) : "Empty"}
            <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 capitalize" align="start" ref={ref} style={{ width: `${triggerWidth}px` }}>
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            {isLoading ? (
              <LoadingSpinner className="my-5" loadingText={loadingPlaceholder || "Loading..."} />
            ) : (
              <CommandList>
                <CommandEmpty>{emptyPlaceholder || "Empty"}</CommandEmpty>
                <CommandGroup>
                  {options?.map(({ label, value, disabled }) => (
                    <CommandItem
                      key={value}
                      value={value}
                      onSelect={(currentValue) => {
                        setSelectedValue(currentValue === selectedValue ? "" : currentValue);
                        setIsOpen(false);
                      }}
                      disabled={disabled}
                    >
                      <CheckIcon className={cn("size-4", selectedValue === value ? "opacity-100" : "opacity-0")} />
                      {tryFormattingNumber(i18n.language as Language, label)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
