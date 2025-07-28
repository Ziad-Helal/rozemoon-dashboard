import { routes } from "@/routes";
import type { LiveEventType } from "@/types/api-types";

export const liveEventsRedirects: { [key in LiveEventType]: string } = {
  order: routes.fastOrders,
  booking: routes.scheduledOrders,
  issue: routes.ordersIssues,
  return: routes.returnInvoices,
  damage: routes.damageInvoices,
  user: routes.registers,
};
