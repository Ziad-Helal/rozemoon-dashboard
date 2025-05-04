import axios from "axios";
import i18next, { TFunction } from "i18next";
import { useEffect } from "react";
import { languages, resources } from "./i18n";
import { useTranslation } from "react-i18next";
import { Currency } from "@/types/api-types";
import { FormatDistanceToken } from "date-fns";

type Language = keyof typeof resources;

export function languageChanger(code: Language) {
  axios.defaults.headers.common["Accept-Language"] = code;
  localStorage.setItem("language", code);
  i18next.changeLanguage(code);
  scrollTo({ top: 0, behavior: "smooth" });
}

export function useLanguageChanger() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", i18n.language);
    root.dir = i18n.dir();
  }, [i18n.dir()]);
}

export function handleDirectionChange(dir: "ltr" | "rtl", ltr: string, rtl: string) {
  return dir === "ltr" ? ltr : rtl;
}

export function formatCounts(language: Language, count: number, singular: string, plural: string, hideNumber?: boolean) {
  return `${!hideNumber ? formatNumber(language, count, "decimal") + " " : ""}${language == "ar" ? (count > 1 && count < 11 ? plural : singular) : count == 1 ? singular : plural}`;
}

export function formatNumber(
  language: Language,
  value: number,
  style: keyof Intl.NumberFormatOptionsStyleRegistry,
  currency?: Currency,
  currencyDisplay?: keyof Intl.NumberFormatOptionsCurrencyDisplayRegistry,
  useGrouping?: boolean,
  defaultCurrencySymbols?: boolean
) {
  const locale = `${language}-${languages.find(({ code }) => code == language)?.countryIso}`;
  const formatted = new Intl.NumberFormat(locale, {
    style: style == "currency" && currency == "SAR" && !defaultCurrencySymbols ? "decimal" : style,
    useGrouping,
    currency,
    currencyDisplay: currencyDisplay || "symbol",
    minimumFractionDigits: style == "currency" && currency == "SAR" ? 2 : undefined,
  }).format(value);
  return currency && currency == "SAR" && !defaultCurrencySymbols ? (
    <span className="inline-flex items-center gap-1.5 w-fit" dir="rtl">
      {formatted}
      {
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" className="w-[1em]">
          <path fill="currentColor" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
          <path
            fill="currentColor"
            d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
          />
        </svg>
      }
    </span>
  ) : (
    formatted
  );
}

export function tryFormattingNumber(language: Language, value: any) {
  return !Number.isNaN(+value) ? formatNumber(language, +value!, "decimal") : value;
}

export function formatDate(language: Language, date: Date, time?: boolean) {
  const locale = `${language}-${languages.find(({ code }) => code == language)?.countryIso}`;
  const formatted = new Date(date).toLocaleString(locale, { dateStyle: "short", timeStyle: time ? "short" : undefined, hour12: true });
  return formatted;
}

export function formatTimeDistance(language: Language, t: TFunction, token: FormatDistanceToken, count: number) {
  switch (token) {
    case "xSeconds":
      return formatCounts(language, count, t("timeUnits.second"), t("timeUnits.seconds"));
    case "xMinutes":
    case "xHours":
      return formatCounts(language, count, t("timeUnits.hour"), t("timeUnits.hours"));
    case "xDays":
      return formatCounts(language, count, t("timeUnits.day"), t("timeUnits.days"));
    case "xWeeks":
      return formatCounts(language, count, t("timeUnits.week"), t("timeUnits.weeks"));
    case "xMonths":
      return formatCounts(language, count, t("timeUnits.month"), t("timeUnits.months"));
    case "xYears":
      return formatCounts(language, count, t("timeUnits.year"), t("timeUnits.years"));
    case "halfAMinute":
      return t("timeDistances.halfAMinute");
    case "lessThanXMinutes":
      return t("timeDistances.lessThan") + " " + formatCounts(language, count, t("timeUnits.minute"), t("timeUnits.minutes"));
    case "lessThanXSeconds":
      return t("timeDistances.lessThan") + " " + formatCounts(language, count, t("timeUnits.second"), t("timeUnits.seconds"));
    case "aboutXHours":
      return t("timeDistances.about") + " " + formatCounts(language, count, t("timeUnits.hour"), t("timeUnits.hours"));
    case "aboutXWeeks":
      return t("timeDistances.about") + " " + formatCounts(language, count, t("timeUnits.week"), t("timeUnits.weeks"));
    case "aboutXMonths":
      return t("timeDistances.about") + " " + formatCounts(language, count, t("timeUnits.month"), t("timeUnits.months"));
    case "aboutXYears":
      return t("timeDistances.about") + " " + formatCounts(language, count, t("timeUnits.year"), t("timeUnits.years"));
    case "almostXYears":
      return t("timeDistances.almost") + " " + formatCounts(language, count, t("timeUnits.year"), t("timeUnits.years"));
    case "overXYears":
      return t("timeDistances.over") + " " + formatCounts(language, count, t("timeUnits.year"), t("timeUnits.years"));
    default:
      return "Wrong token";
  }
}
