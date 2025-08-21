import { ReactNode, useEffect } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Form } from "./form";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { ApiError } from "@/types/api-types";
import { t } from "i18next";

interface AdvancedForm_Props<TFieldValues extends FieldValues, TResponse> {
  form: UseFormReturn<TFieldValues>;
  inputFields: ReactNode;
  onSubmit?: (values: TFieldValues) => Promise<TResponse>;
  onSubmitSync?: (values: TFieldValues) => void;
  submitOnChange?: boolean;
  submitOnBlur?: boolean;
  className?: string;
  resetErrors?: () => void;
  isSubmitting?: boolean;
  resetFormButton?: ReactNode;
  resetButtonClassName?: string;
  submitButtonClassName?: string;
  submittingPhrase?: string;
  actionsContainerClassName?: string;
  fieldsContainerClassName?: string;
}

export function AdvancedForm<TFieldValues extends FieldValues, TResponse>({
  form,
  inputFields,
  onSubmit,
  onSubmitSync,
  submitOnChange,
  submitOnBlur,
  className,
  resetErrors,
  isSubmitting,
  resetFormButton,
  resetButtonClassName,
  submitButtonClassName,
  submittingPhrase,
  actionsContainerClassName,
  fieldsContainerClassName,
}: AdvancedForm_Props<TFieldValues, TResponse>) {
  function formResetHandler() {
    // Clear Files
    const fileFields = document.querySelectorAll<HTMLInputElement>("input[type='file']");
    const uploadedFiles = document.querySelectorAll<HTMLElement>(".uploadedFiles");
    fileFields.forEach((input) => {
      input.value = "";
    });
    uploadedFiles.forEach((filesContainer) => filesContainer.remove());

    // Clear Form Values and Errors
    form.reset();
    resetErrors?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Submit the form on every input change
  useEffect(() => {
    if (!submitOnChange) return;
    const subscription = form.watch(() => {
      form.handleSubmit(submitHandler)();
    });
    return () => subscription.unsubscribe();
  }, [form.watch(), submitOnChange]);

  // Submit the form synchronously or asynchrounsly
  function submitHandler(values: TFieldValues) {
    onSubmit?.(values)
      .then(submitOnChange || submitOnBlur ? undefined : formResetHandler)
      .catch((error: AxiosError<ApiError, TFieldValues>) => {
        const errors = error.response?.data.errors;
        if (errors) {
          for (const key in errors) {
            form.setError((key[0].toLowerCase() + key.slice(1)) as Path<TFieldValues>, { message: errors[key] });
          }
        }
      });

    onSubmitSync?.(values);
  }

  return (
    <Form {...form}>
      <form className={className} onSubmit={form.handleSubmit(submitHandler)}>
        <div className={cn("space-y-3", fieldsContainerClassName)} onBlur={submitOnBlur ? form.handleSubmit(submitHandler) : undefined}>
          {inputFields}
        </div>
        <div className={cn("mt-6 flex items-center gap-3 flex-wrap", actionsContainerClassName)}>
          <Button type="submit" size="lg" className={submitButtonClassName} isLoading={isSubmitting}>
            {submittingPhrase ? submittingPhrase : t("forms.submit")}
          </Button>
          {resetFormButton && (
            <Button size="lg" variant="secondary" className={resetButtonClassName} onClick={formResetHandler} disabled={isSubmitting}>
              {t("forms.reset")}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
