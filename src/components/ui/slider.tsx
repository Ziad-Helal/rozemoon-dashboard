import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { ToolTip } from "../misc";

const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
		<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
			<SliderPrimitive.Range className={cn("absolute h-full bg-primary", props.disabled ? "bg-primary/50" : "")} />
		</SliderPrimitive.Track>
		{props.value?.map((_, index) => (
			<ToolTip
				key={index}
				content={props.value!.length > 1 ? (index == 0 ? "minimum" : "maximum") : "exactly"}
				trigger={
					<SliderPrimitive.Thumb className="block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer" />
				}
			/>
		))}
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
