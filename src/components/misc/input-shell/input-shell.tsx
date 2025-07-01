import { Label } from "@/components/ui";
import type { ReactNode } from "react";

interface InputShell_Props {
  htmlFor: string;
  children: ReactNode;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export default function InputShell({ htmlFor, label, labelClassName, containerClassName, children }: InputShell_Props) {
  return (
    <div className={containerClassName}>
      {label && (
        <Label htmlFor={htmlFor} className={labelClassName}>
          {label}
        </Label>
      )}
      {children}
    </div>
  );
}
