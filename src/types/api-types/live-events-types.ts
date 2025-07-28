export type LiveEventType = "order" | "booking" | "issue" | "return" | "damage" | "user";

export interface LiveEvent {
  type: LiveEventType;
  id: number;
  createdAt: Date;
}
