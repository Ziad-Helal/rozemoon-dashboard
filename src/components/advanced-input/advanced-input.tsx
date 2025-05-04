import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from "@/components/ui";
import { InputField } from "@/types/form-types";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { DateInput, FileInput, PasswordInput, QuantityInput, RangeDateInput, SearchInput, SelectInput, SliderInput, SwitchInput } from "./components";
import { useTranslation } from "react-i18next";

interface AdvancedInput_Props<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  inputField: InputField<TFieldValues>;
  isSubmitting?: boolean;
}

export default function AdvancedInput<TFieldValues extends FieldValues>({ form, inputField, isSubmitting }: AdvancedInput_Props<TFieldValues>) {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const { control } = form;
  const { id, label, type, direction, containerClassName } = inputField;

  return (
    <FormField
      name={id}
      control={control}
      render={({ field }) => {
        const inputProps = { ...field, ...inputField, disabled: field.disabled || isSubmitting };
        delete inputProps.containerClassName;
        return (
          <FormItem className={containerClassName} dir={direction || dir}>
            {type == "switch" ? (
              <SwitchInput {...inputProps} />
            ) : (
              <>
                {label && (
                  <FormLabel htmlFor={id} className={inputProps.disabled ? "opacity-70 cursor-not-allowed" : ""}>
                    {label}
                  </FormLabel>
                )}
                <FormControl>
                  {type == "date" ? (
                    <DateInput {...inputProps} />
                  ) : type == "range-date" ? (
                    <RangeDateInput {...inputProps} />
                  ) : type == "file" ? (
                    <FileInput {...inputProps} />
                  ) : type == "slider" ? (
                    <SliderInput {...inputProps} />
                  ) : type == "select" ? (
                    <SelectInput {...inputProps} />
                  ) : type == "textarea" ? (
                    <Textarea {...inputProps} />
                  ) : type == "password" ? (
                    <PasswordInput {...inputProps} />
                  ) : type == "search" ? (
                    <SearchInput {...inputProps} />
                  ) : type == "quantity" ? (
                    <QuantityInput {...inputProps} />
                  ) : (
                    <Input {...inputProps} value={inputProps.value || ""} onChange={(event) => field.onChange(type == "number" ? +event.target.value : event.target.value)} />
                  )}
                </FormControl>
              </>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
