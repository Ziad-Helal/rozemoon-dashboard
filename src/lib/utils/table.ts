import { handleDirectionChange } from "@/localization";

export function getPinningStyles(dir: "ltr" | "rtl", pinPosition: "left" | "right" | false, pinOffset: number) {
	const className = pinPosition
		? "sticky bg-background z-10" +
		  (pinPosition == "left"
				? " [&:nth-child(2)]:after:h-full [&:nth-child(2)]:after:w-[1px] [&:nth-child(2)]:after:bg-border [&:nth-child(2)]:after:absolute [&:nth-child(2)]:after:top-0 " +
				  handleDirectionChange(dir, "[&:nth-child(2)]:after:right-0", "[&:nth-child(2)]:after:left-0")
				: " after:h-full after:w-[1px] after:bg-border after:absolute after:top-0 " + handleDirectionChange(dir, "after:left-0", "after:right-0"))
		: "";

	const styles = {
		[handleDirectionChange(dir, "left", "right")]: pinPosition == "left" ? pinOffset + "px" : "unset",
		[handleDirectionChange(dir, "right", "left")]: pinPosition == "right" ? pinOffset + "px" : "unset",
	};

	return { className, styles };
}
