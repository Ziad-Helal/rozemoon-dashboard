import { ForwardedRef, forwardRef } from "react";
import { FileUploader, UploadedFiles } from "./components";
import { DropzoneProps } from "react-dropzone";
import { FieldValues, Path } from "react-hook-form";

interface FileInput_Props<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  id?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  onBlur?: () => void;
  disabled?: boolean;
  accept?: DropzoneProps["accept"];
  multiple?: boolean;
  maxFileSize?: number;
  maxFilesCount?: number;
}

export const FileInput = forwardRef(
  <TFieldValues extends FieldValues>(
    { id, name, value, onChange, onBlur, disabled, accept, multiple, maxFileSize, maxFilesCount }: FileInput_Props<TFieldValues>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <>
        <FileUploader
          id={id || name}
          value={value}
          onValueChange={onChange}
          onBlur={onBlur}
          maxFileCount={maxFilesCount}
          maxSize={maxFileSize}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          ref={ref}
        />
        {value?.length ? <UploadedFiles files={value} updateFiles={onChange} disabled={disabled} /> : null}
      </>
    );
  }
);
