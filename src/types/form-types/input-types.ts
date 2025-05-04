import { HTMLInputTypeAttribute, ReactNode } from "react";
import { DropzoneProps } from "react-dropzone";
import { Path } from "react-hook-form";

export type InputField<TFieldID> = {
  id: Path<TFieldID>;
  type: "textarea" | "select" | "switch" | "rating" | "slider" | "range-date" | "quantity" | HTMLInputTypeAttribute;

  // General
  label?: string;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  direction?: "ltr" | "rtl";

  // Textarea
  rows?: number;

  // Select
  options?: SelectOption[];
  triggerPlaceholder?: string;
  searchPlaceholder?: string;
  emptyPlaceholder?: string;
  loadingPlaceholder?: string;

  // File
  accept?: DropzoneProps["accept"];
  multiple?: boolean;
  maxFileSize?: number;
  maxFilesCount?: number;

  // Slider
  min?: number;
  max?: number;
};

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}
