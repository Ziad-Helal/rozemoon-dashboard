import { liveEventsRedirects } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { LiveEvent } from "@/types/api-types";
import { formatDate, type Language } from "@/localization";

interface LiveEvent_Item_Props {
  event: LiveEvent;
}

export default function LiveEvent_Item({ event }: LiveEvent_Item_Props) {
  const { type, id, createdAt } = event;
  const { t, i18n } = useTranslation();

  return (
    <Link to={liveEventsRedirects[type]} data-aos="flip-down" className="capitalize text-sm border rounded-md p-2 bg-muted block mt-2 ">
      <span className="text-muted-foreground me-2">#{id}</span>
      <span>{t(`header.liveEvents.types.${type}`)}</span>
      <span className="text-muted-foreground block text-end">{formatDate(i18n.language as Language, createdAt, true)}</span>
    </Link>
  );
}
