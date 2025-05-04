import { Slider } from "@/components/ui";
import { formatNumber, resources } from "@/localization";
import { SliderProps } from "@radix-ui/react-slider";
import { ForwardedRef, forwardRef } from "react";
import { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SliderInput_Props<TFieldValues extends FieldValues> extends Omit<SliderProps, "onChange"> {
	name: Path<TFieldValues>;
	onChange?: (value: number[]) => void;
}

export const SliderInput = forwardRef(
	<TFieldValues extends FieldValues>({ id, name, value, onChange, ...props }: SliderInput_Props<TFieldValues>, ref: ForwardedRef<HTMLSpanElement>) => {
		const { i18n } = useTranslation();
		const language = i18n.language as keyof typeof resources;

		return (
			<>
				<Slider id={id || name} name={name} value={value} className="!mt-2" onValueChange={onChange} ref={ref} {...props} />
				{value?.length ? (
					<p className="flex justify-between mt-2 text-sm">
						<span>{formatNumber(language, value[0], "decimal")}</span>
						<span>{formatNumber(language, value[1], "decimal")}</span>
					</p>
				) : null}
			</>
		);
	},
);
