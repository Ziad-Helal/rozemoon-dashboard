import { useEffect, useState } from "react";

export default function useFavIconHandler() {
	const [systemTheme, setSystemTheme] = useState<"light" | "dark">(matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

	useEffect(() => {
		const darkTheme = matchMedia("(prefers-color-scheme: dark)");
		iconThemeChanger();
		darkTheme.addEventListener("change", iconThemeChanger);

		function iconThemeChanger() {
			changeIconTheme(darkTheme.matches ? "dark" : "light");
		}

		return () => {
			darkTheme.removeEventListener("change", iconThemeChanger);
		};
	}, []);

	function changeIconTheme(theme: "light" | "dark") {
		const icon = document.head.querySelector("link[rel='icon']");
		icon?.setAttribute("href", `/logo-${theme}.svg`);
		setSystemTheme(theme);
	}

	return systemTheme;
}
