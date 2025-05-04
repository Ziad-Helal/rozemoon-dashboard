import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ar, en } from "./locales";

const defaultLanguage = localStorage.getItem("language") || undefined;

export const languages: { name: string; code: keyof typeof resources; countryIso: string }[] = [
	{ name: "English", code: "en", countryIso: "UK" },
	{ name: "العربية", code: "ar", countryIso: "EG" },
];

export const resources = {
	en: { translation: en },
	ar: { translation: ar },
} as const;

i18n.use(initReactI18next).init({
	resources,
	lng: defaultLanguage,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
