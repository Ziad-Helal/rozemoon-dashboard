import { PaginationFilters } from "@/types/api-types";
import { ColumnFiltersState } from "@tanstack/react-table";

export function convertPaginationToTableFilters(PaginationFilters: PaginationFilters) {
  const tableFilters: ColumnFiltersState = [];
  for (const key in PaginationFilters) {
    tableFilters.push({ id: key, value: PaginationFilters[key as keyof PaginationFilters] });
  }

  return tableFilters;
}

// Temporary, untill the database refresh
export function solveAddressTypeIssue(response: any) {
  const items = response.items.map((item: any) => {
    if (item.deliveryAddress[0] == "{" && item.deliveryAddress[1] == '"') return { ...item, deliveryAddress: JSON.parse(item.deliveryAddress) };
    else return { ...item, deliveryAddress: { id: 0, country: "", gLocation: "", shortName: "", fullAddress: "", isDefault: false } };
  });
  return { ...response, items };
}
