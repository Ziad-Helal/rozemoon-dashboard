import { resources } from "./i18n";

export type Language = keyof typeof resources;

declare module "i18next" {
	interface CustomTypeOptions {
		resources: (typeof resources)["en"];
	}
}
