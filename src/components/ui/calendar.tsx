import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { formatNumber, formatTimeDistance, handleDirectionChange, resources } from "@/localization";

type Language = keyof typeof resources;
export type CalendarProps = ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const { i18n, t } = useTranslation();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:gap-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "gap-1 flex items-center",
        nav_button: cn(buttonVariants({ variant: "outline" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        nav_button_previous: cn("absolute", handleDirectionChange(i18n.dir(), "left-1", "right-1 rotate-180")),
        nav_button_next: cn("absolute", handleDirectionChange(i18n.dir(), "right-1", "left-1 rotate-180")),
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])>button]:text-background [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? handleDirectionChange(
                i18n.dir(),
                "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                "[&:has(>.day-range-end)]:rounded-l-md [&:has(>.day-range-start)]:rounded-r-md first:[&:has([aria-selected])]:rounded-r-md last:[&:has([aria-selected])]:rounded-l-md"
              )
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(buttonVariants({ variant: "ghost" }), "size-8 p-0 font-normal aria-selected:opacity-100"),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => <ChevronLeft className={cn("size-4", className)} {...props} />,
        IconRight: ({ className, ...props }) => <ChevronRight className={cn("size-4", className)} {...props} />,
        DayContent: ({ date }) => <span>{formatNumber(i18n.language as Language, date.getDate(), "decimal")}</span>,
        CaptionLabel: ({ displayMonth }) => {
          const month = displayMonth.getMonth() as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
          const year = displayMonth.getFullYear();
          return (
            <span>
              {t(`months.${month}`)} {formatNumber(i18n.language as Language, year, "decimal", undefined, undefined, false)}
            </span>
          );
        },
      }}
      locale={{
        code: i18n.language,
        formatRelative: (value) => t(`timeUnits.${value}`),
        formatDistance: (token, count) => formatTimeDistance(i18n.language as Language, t, token, count),
        localize: {
          day: (day) => t(`days.${day}`),
          dayPeriod: (period) => t(`dayPeriods.${period}`),
          era: (era) => t(`era.${era}`),
          month: (month) => t(`months.${month}`),
          ordinalNumber: (number) => formatNumber(i18n.language as Language, number, "decimal", undefined, undefined, undefined, true) as string,
          quarter: (quarter) => t(`quarters.${quarter}`),
        },
        options: { weekStartsOn: 6 },
        // To be localized
        formatLong: { date: () => "", dateTime: () => "", time: () => "" },
        match: {
          day: () => null,
          dayPeriod: () => null,
          era: () => null,
          month: () => null,
          ordinalNumber: () => null,
          quarter: () => null,
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
