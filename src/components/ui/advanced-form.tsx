import { ReactNode, useRef } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Form } from "./form";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { ApiError } from "@/types/api-types";
import { t } from "i18next";
import { useEffectAfterMount } from "@/hooks/misc";

interface AdvancedForm_Props<TFieldValues extends FieldValues, TResponse> {
  form: UseFormReturn<TFieldValues>;
  inputFields: ReactNode;
  onSubmit?: (values: TFieldValues) => Promise<TResponse>;
  onSubmitSync?: (values: TFieldValues) => void;
  submitOnChange?: boolean;
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
  const submitRef = useRef<HTMLButtonElement>(null);

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

  useEffectAfterMount(() => {
    if (submitOnChange) submitRef.current?.click();
  }, [form.watch()]);

  async function submitHandler(values: TFieldValues) {
    onSubmit?.(values)
      .then(submitOnChange ? undefined : formResetHandler)
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
        <div className={cn("space-y-3", fieldsContainerClassName)}>{inputFields}</div>
        <div className={cn("mt-6 flex items-center gap-3 flex-wrap", actionsContainerClassName)}>
          <Button type="submit" size="lg" className={submitButtonClassName} isLoading={isSubmitting} ref={submitRef}>
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

// onChange={submitOnChange ? form.handleSubmit(submitHandler) : undefined}
