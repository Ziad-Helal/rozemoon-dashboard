import { useEffectAfterMount, useWebSocket } from "@/hooks/misc";
import { getCookie } from "@/lib/utils";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Dispatch, FC, ReactNode, SetStateAction } from "react";
import type { LiveEvent } from "@/types/api-types";

const url = (import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_WEBSOCKETS_END_POINT + import.meta.env.VITE_WEBSOCKET_LIVE_EVENTS) as string;

interface LiveEventsContext_Type {
  events: LiveEvent[];
  unseenCount: number;
  setIsTrackingUnseenCount: Dispatch<SetStateAction<boolean>>;
}

const LiveEventsContext = createContext<LiveEventsContext_Type | undefined>(undefined);

interface LiveEventsProvider_Props {
  children: ReactNode;
}

export const LiveEventsProvider: FC<LiveEventsProvider_Props> = ({ children }) => {
  const accessToken = getCookie("accessToken");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const [isTrackingUnseenCount, setIsTrackingUnseenCount] = useState(true);
  const { lastMessage } = useWebSocket(`${url}?access_token=${accessToken}`);

  useEffectAfterMount(() => {
    if (lastMessage) {
      const formatted = JSON.parse(lastMessage);
      if (formatted.id) {
        setEvents((prevEvents) => [formatted, ...(prevEvents.length < 99 ? prevEvents : prevEvents.slice(0, -2))]);
        if (isTrackingUnseenCount) setUnseenCount((prevCount) => prevCount + 1);
        audioRef.current?.play();
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (!isTrackingUnseenCount) setUnseenCount(0);
  }, [isTrackingUnseenCount]);

  const value: LiveEventsContext_Type = {
    events,
    unseenCount,
    setIsTrackingUnseenCount,
  };

  return (
    <LiveEventsContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src="/notification-alert.mp3" />
    </LiveEventsContext.Provider>
  );
};

export const useLiveEventsContext = () => {
  const context = useContext(LiveEventsContext);
  if (!context) {
    throw new Error("useLiveEventsContext must be used within an LiveEventsProvider");
  }
  return context;
};
