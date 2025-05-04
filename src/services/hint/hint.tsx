import { Button } from "@/components/ui";
import { toast } from "sonner";

export function goodHint(message?: string) {
	toast("Success", {
		description: message || "Successful action!",
		className: "!bg-green-200",
		classNames: { title: "text-green-700 text-base", description: "!text-green-600" },
	});
}

export function badHint(message?: string, onAction?: () => void, actionLabel?: string) {
	toast("Failure", {
		description: message || "Failed action!",
		className: "!bg-red-200 flex-col items-start",
		classNames: { title: "text-red-700 text-base", description: "!text-red-500" },
		action: onAction && (
			<Button variant="secondary" size="sm" className="place-self-end" onClick={onAction}>
				{actionLabel || "action"}
			</Button>
		),
	});
}
