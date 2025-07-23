import { useSignalR, useWebSocket } from "@/hooks/misc";
import { getCookie } from "@/lib/utils";

const url = (import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_WEBSOCKETS_END_POINT + import.meta.env.VITE_WEBSOCKET_LIVE_EVENTS) as string;

export default function useLiveEvents() {
  const accessToken = getCookie("accessToken");
  const { status, lastMessage } = useWebSocket(`${url}?access_token=${accessToken}`);
  //   const { status, lastMessage } = useSignalR(url);
  console.log(status, lastMessage);
}
