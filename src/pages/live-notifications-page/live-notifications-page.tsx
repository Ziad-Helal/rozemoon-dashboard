import { Form_Page } from "@/components/layouts";
import { useLiveEventsContext } from "@/store";
import { useTranslation } from "react-i18next";
import { LiveEvent_Item } from "./components";
import { useEffect } from "react";

export default function LiveNotifications_Page() {
  const { t } = useTranslation();
  const { events, setIsTrackingUnseenCount } = useLiveEventsContext();

  useEffect(() => {
    setIsTrackingUnseenCount(false);
    return () => {
      setIsTrackingUnseenCount(true);
    };
  }, []);

  return (
    <Form_Page heading={t("header.liveEvents.title")}>
      <ul>
        {events.map((event) => (
          <li key={event.createdAt.toString()}>
            <LiveEvent_Item event={event} />
          </li>
        ))}
      </ul>
    </Form_Page>
  );
}
