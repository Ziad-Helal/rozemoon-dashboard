import { File_Card } from "./components";

interface UploadedFiles_Props {
  files: File[];
  updateFiles?: (files: File[]) => void;
  disabled?: boolean;
}

export default function UploadedFiles({ files, updateFiles, disabled }: UploadedFiles_Props) {
  function onRemove(index: number) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    updateFiles?.(newFiles);
  }

  return (
    <div className="!mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
      {files?.map((file, index) => (
        <File_Card key={index} file={file} onRemove={() => onRemove(index)} disabled={disabled} />
      ))}
    </div>
  );
}
