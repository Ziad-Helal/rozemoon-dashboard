import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Container_Props {
	children: ReactNode;
	className?: string;
}

export default function Container({ children, className }: Container_Props) {
	return <div className={cn("relative p-3 lg:py-6 min-h-[calc(100svh-theme(spacing.16))]", className)}>{children}</div>;
}
