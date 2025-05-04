import Dropzone, { type DropzoneProps, type FileRejection } from "react-dropzone";
import { UploadIcon } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import { ForwardedRef, forwardRef, HTMLAttributes, useCallback } from "react";
import { badHint } from "@/services/hint";
import { formatNumber, Language } from "@/localization";
import { useTranslation } from "react-i18next";

interface FileUploader_Props extends HTMLAttributes<HTMLDivElement> {
  value?: File[];
  onValueChange?: (files: File[]) => void;
  accept?: DropzoneProps["accept"];
  maxSize?: DropzoneProps["maxSize"];
  maxFileCount?: DropzoneProps["maxFiles"];
  multiple?: boolean;
  disabled?: boolean;
}

export const FileUploader = forwardRef(
  (
    {
      value: valueProp,
      onValueChange,
      accept = {
        "image/*": [],
      },
      maxSize = 1024 * 1024 * 2,
      maxFileCount = 1,
      multiple = false,
      disabled = false,
      className,
      ...dropzoneProps
    }: FileUploader_Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { i18n, t } = useTranslation();
    const currentMaxFilesCount = maxFileCount - (valueProp?.length || 0);
    const isDisabled = disabled || (valueProp?.length ?? 0) >= maxFileCount;

    const onDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (rejectedFiles.length > 0) badHint(`Do not upload more than ${currentMaxFilesCount} files.`);
        else {
          const newFiles = acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );
          const updatedFiles = valueProp ? [...valueProp, ...newFiles] : newFiles;
          onValueChange?.(updatedFiles);
        }
      },
      [valueProp, maxFileCount, multiple, onValueChange]
    );

    return (
      <Dropzone onDrop={onDrop} accept={accept} maxSize={maxSize} maxFiles={currentMaxFilesCount} multiple={currentMaxFilesCount > 1 || multiple} disabled={isDisabled}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            ref={ref}
            {...getRootProps()}
            className={cn(
              "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isDragActive && "border-muted-foreground/50",
              isDisabled && "pointer-events-none opacity-60",
              className
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <UploadIcon className="size-7 text-muted-foreground" aria-hidden="true" />
                </div>
                <p className="font-medium text-muted-foreground">{t("inputPlaceHolders.file.1")}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <UploadIcon className="size-7 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-px">
                  <p className="font-medium text-muted-foreground">{t("inputPlaceHolders.file.2")}</p>
                  <p className="text-sm text-muted-foreground/70">
                    {t("inputPlaceHolders.file.3.1")}
                    {maxFileCount > 1
                      ? ` ${maxFileCount === Infinity ? t("inputPlaceHolders.file.3.2") : formatNumber(i18n.language as Language, maxFileCount, "decimal")}
                      ${t("inputPlaceHolders.file.3.3")} ${formatBytes(maxSize)} ${t("inputPlaceHolders.file.3.4")}`
                      : ` ${t("inputPlaceHolders.file.3.5")} ${formatBytes(maxSize)}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
    );
  }
);

export default FileUploader;
