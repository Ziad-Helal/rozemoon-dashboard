import { FC } from "react";
import { Currency } from "@/types/api-types";

export type ColumnType = "boolean" | "date" | "number" | "price" | "percentage" | "color" | "link" | "country" | "actions";
export type typeOrStatusType =
  | "notificationTypes"
  | "productTypes"
  | "fastOrderStatus"
  | "scheduledOrderStatus"
  | "orderIssueStatus"
  | "orderRreturnRequestStatus"
  | "stockRefillRequestStatus"
  | "paymentMethods"
  | "currencies"
  | "userStatus";

export interface Column<ActionsProps> {
  accessorKey: string;
  label: string;
  type?: ColumnType;
  typeOrStatus?: typeOrStatusType;
  falseIsDestructive?: boolean;
  currency?: Currency;
  enableHiding?: boolean;
  enableSorting?: boolean;
  hidden?: boolean;
  actions?: FC<ActionsProps>;
  actionsProps?: (keyof ActionsProps)[];
}

export interface Filter {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface FilterOption {
  label: string;
  value: string | number | boolean;
}
