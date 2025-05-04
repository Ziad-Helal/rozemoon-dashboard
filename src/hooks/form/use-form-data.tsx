import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/types/form-types";
import { useMemo } from "react";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AdvancedInput } from "@/components";

interface useFormData_Props<FormFields extends FieldValues> {
  formSchema: any;
  inputFields: InputField<FormFields>[];
  defaultValues: any;
  submitRequest?: UseMutateAsyncFunction<any, Error, void, unknown>;
  isSubmitting?: boolean;
}

export function useFormData<FormFields extends FieldValues>({ formSchema, inputFields, defaultValues, isSubmitting }: useFormData_Props<FormFields>) {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const renderedFields = useMemo(
    () => inputFields.map((field) => <AdvancedInput key={field.id} form={form} inputField={field} isSubmitting={isSubmitting} />),
    [inputFields, form, isSubmitting]
  );

  return { form, renderedFields };
}
