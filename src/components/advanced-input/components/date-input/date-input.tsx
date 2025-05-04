import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FocusEventHandler, ForwardedRef, forwardRef, MouseEvent, useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import { FieldValues, Path } from "react-hook-form";
import { SelectInput } from "../select-input";
import { SelectOption } from "@/types/form-types";
import { formatDate, resources } from "@/localization";
import { useTranslation } from "react-i18next";

type Language = keyof typeof resources;

const presets: SelectOption[] = [
	{ label: "Tomorrow", value: "1" },
	{ label: "In 3 days", value: "3" },
	{ label: "In a week", value: "7" },
];

interface DateInput_Props<TFieldValues extends FieldValues> {
	name: Path<TFieldValues>;
	id?: string;
	value?: Date;
	onChange?: SelectSingleEventHandler;
	onBlur?: FocusEventHandler<HTMLButtonElement>;
	placeholder?: string;
	disabled?: boolean;
}

export const DateInput = forwardRef(
	<TFieldValues extends FieldValues>({ id, name, value, onChange, onBlur, placeholder, disabled }: DateInput_Props<TFieldValues>, ref: ForwardedRef<HTMLDivElement>) => {
		const { i18n } = useTranslation();
		const [date, setDate] = useState<Date | undefined>(value);

		function onPresetSelect(value: string) {
			const date = addDays(new Date(), parseInt(value));
			setDate(date);
			onChange?.(date, date, {}, {} as unknown as MouseEvent<HTMLButtonElement>);
		}

		return (
			<Popover modal>
				<PopoverTrigger id={id || name} onBlur={onBlur} disabled={disabled} asChild>
					<Button variant="outline" className={cn("w-full font-normal normal-case", !value && "text-muted-foreground")} aria-label="Select a date">
						{value ? formatDate(i18n.language as Language, value) : placeholder || "Pick a date"}
						<CalendarIcon className="ms-auto size-4 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto flex flex-col gap-2 p-2" align="start" ref={ref}>
					<SelectInput name="presets" options={presets} triggerPlaceholder="select" onChange={onPresetSelect} />
					<div className="rounded-md border">
						<Calendar
							mode="single"
							selected={date}
							onSelect={(...args) => {
								onChange?.(...args);
								setDate(args[0]);
							}}
							disabled={(date) => date < new Date()}
							initialFocus
						/>
					</div>
				</PopoverContent>
			</Popover>
		);
	},
);
