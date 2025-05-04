import { HTMLAttributes, ImgHTMLAttributes, useState } from "react";
import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Image_Props extends ImgHTMLAttributes<HTMLImageElement> {
	containerProps?: HTMLAttributes<HTMLSpanElement>;
}

export default function Image({ containerProps, ...props }: Image_Props) {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<span {...containerProps} className={cn("h-full relative overflow-hidden block", containerProps?.className)}>
			<img
				{...props}
				className={cn("h-full w-full object-contain", isLoaded ? "opacity-100" : "opacity-0", props?.className)}
				loading="lazy"
				onLoad={(event) => {
					setIsLoaded(true);
					props.onLoad && props.onLoad(event);
				}}
			/>
			{isLoaded || <Skeleton className="w-full h-full absolute inset-0" />}
		</span>
	);
}
