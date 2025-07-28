import { useLiveEventsContext } from "@/store";
import { LiveEvent_Item } from "./components";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { handleDirectionChange } from "@/localization";

export default function SideEvents() {
  const { t, i18n } = useTranslation();
  const { events } = useLiveEventsContext();

  return (
    <aside className="max-2xl:hidden w-[--sidebar-width] relative">
      <div className={cn("border rounded-md p-2 w-[calc(var(--sidebar-width)-1rem)] fixed inset-2", handleDirectionChange(i18n.dir(), "left-auto", "right-auto"))}>
        <h2 className="text-2xl font-medium text-center border-b h-[47px] grid items-center capitalize">{t("header.liveEvents.title")}</h2>
        <ul>
          {events.map((event) => (
            <li key={event.createdAt.toString()}>
              <LiveEvent_Item event={event} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
