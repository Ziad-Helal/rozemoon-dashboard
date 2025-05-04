import { FormControl, FormLabel, Switch } from "@/components/ui";
import { SwitchProps } from "@radix-ui/react-switch";
import { ForwardedRef, forwardRef } from "react";
import { FieldValues, Path } from "react-hook-form";

interface SwitchInput_Props<TFieldValues extends FieldValues> extends Omit<SwitchProps, "type" | "value" | "onChange"> {
	name: Path<TFieldValues>;
	value?: boolean;
	label?: string;
	onChange?: (checked: boolean) => void;
}

export const SwitchInput = forwardRef(
	<TFieldValues extends FieldValues>({ id, name, label, value, onChange, ...props }: SwitchInput_Props<TFieldValues>, ref: ForwardedRef<HTMLButtonElement>) => {
		return (
			<FormLabel htmlFor={id} className="flex gap-2 items-center border border-input px-3 h-9 rounded-md">
				<FormControl>
					<Switch id={id || name} name={name} checked={value} onCheckedChange={onChange} ref={ref} {...props} type="button" />
				</FormControl>
				{label}
			</FormLabel>
		);
	},
);
