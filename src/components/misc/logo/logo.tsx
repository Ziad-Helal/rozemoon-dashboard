import { Image, useTheme } from "@/components";
import { cn } from "@/lib/utils";
import { routes } from "@/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

interface Logo_Props {
	className?: string;
	long?: boolean;
}

export default function Logo({ className, long }: Logo_Props) {
	const { i18n } = useTranslation();
	const { systemTheme } = useTheme();

	return (
		<Link to={routes.home} className={cn("flex w-fit", className)}>
			<Image src={`/logo-${systemTheme}${long ? `-${i18n.language == "ar" ? "ar" : "en"}` : ""}.svg`} alt="Roze Moon" />
		</Link>
	);
}
