import { useEffect, useRef, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { getCookie } from "@/lib/utils";

export enum ConnectionStatus {
  CONNECTING = "CONNECTING",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  RECONNECTING = "RECONNECTING",
}

export interface ConnectionHook {
  lastMessage: string | null;
  status: ConnectionStatus;
  sendMessage: (message: string) => void;
}

interface Options {
  maxReconnectAttempts?: number; // Max attempts for reconnection
  reconnectDelay?: (attempt: number) => number; // Function to calculate delay
  onOpen?: () => void; // Callback for WebSocket open event
  onMessage?: (message: any) => void; // Callback for incoming messages
  onError?: (error: Event) => void; // Callback for WebSocket errors
  onClose?: () => void; // Callback for WebSocket close event
}

/**
 * Hook to manage connections with auto-reconnect and state management.
 * @param url - The connection URL to connect to.
 * @param options - Configuration options for the connection behavior.
 * @returns ConnectionHook containing state and utility functions.
 */
export default function useSignalR(
  url: string,
  {
    maxReconnectAttempts = 5,
    reconnectDelay = (attempt) => Math.min(5000, Math.pow(2, attempt) * 1000), // Default: exponential backoff
    onOpen,
    onMessage,
    onError,
    onClose,
  }: Options = {}
) {
  const [lastMessage, setLastMessage] = useState<any | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.CONNECTING);
  const connectionRef = useRef<HubConnection | null>(null);
  const reconnectAttempts = useRef<number>(0); // Tracks reconnection attempts

  const connectSignalR = () => {
    setStatus(ConnectionStatus.CONNECTING);
    const connection = new HubConnectionBuilder().withUrl(url, { accessTokenFactory: () => getCookie("accessToken")! }).build();
    connectionRef.current = connection;

    connection
      .start()
      .then(() => {
        setStatus(ConnectionStatus.OPEN);
        reconnectAttempts.current = 0; // Reset reconnection attempts
        onOpen?.(); // Trigger custom callback
      })
      .catch((error) => {
        onError?.(error); // Trigger custom callback
      });

    connection.on("newConnection", (payload) => {
      setLastMessage(payload);
      onMessage?.(payload); // Trigger custom callback
    });

    connection.onclose(() => {
      setStatus(ConnectionStatus.CLOSED);
      onClose?.(); // Trigger custom callback

      // Attempt to reconnect if below the max attempts
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1;
        setStatus(ConnectionStatus.RECONNECTING);
        setTimeout(connectSignalR, reconnectDelay(reconnectAttempts.current));
      }
    });
  };

  const sendMessage = (message: string) => {
    if (connectionRef.current && status === ConnectionStatus.OPEN) {
      connectionRef.current.send(message);
    } else {
      console.warn("The connection is not open.");
    }
  };

  useEffect(() => {
    connectSignalR();

    return () => {
      connectionRef.current?.off("newConnection");
    };
  }, [url]);

  return { lastMessage, status, sendMessage };
}
