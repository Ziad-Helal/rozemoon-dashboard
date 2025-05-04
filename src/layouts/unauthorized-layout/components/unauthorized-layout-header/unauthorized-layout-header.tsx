import { ColorTheme_Toggler, Language_Toggler, Logo } from "@/components";
import { Separator } from "@/components/ui";

export default function Unauthorized_LayoutHeader() {
	return (
		<header className="flex h-16 shrink-0 items-center justify-between border-b">
			<div className="flex items-center gap-4 px-3">
				<Logo long />
				<Separator orientation="vertical" className="h-5" />
				<p className="uppercase text-lg md:text-2xl xl:text-3xl font-medium text-primary">dashboard</p>
			</div>
			<div className="flex items-center gap-2 px-3">
				<Language_Toggler />
				<ColorTheme_Toggler />
			</div>
		</header>
	);
}
