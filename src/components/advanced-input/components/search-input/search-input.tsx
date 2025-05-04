import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { handleDirectionChange } from "@/localization";
import { SearchIcon } from "lucide-react";
import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SearchInput_Props<TFieldValues extends FieldValues> extends Omit<ComponentProps<"input">, "accept"> {
	name: Path<TFieldValues>;
}

export const SearchInput = forwardRef(
	<TFieldValues extends FieldValues>({ id, name, className, ...props }: SearchInput_Props<TFieldValues>, ref: ForwardedRef<HTMLInputElement>) => {
		const { i18n } = useTranslation();
		return (
			<div className="relative">
				<SearchIcon
					className={cn("size-4 opacity-50 absolute top-1/2 -translate-y-1/2", handleDirectionChange(i18n.dir(), "left-0 translate-x-1/2", "right-0 -translate-x-1/2"))}
				/>
				<Input id={id || name} name={name} className={cn("ps-8", className)} ref={ref} {...props} type="search" />
			</div>
		);
	},
);
