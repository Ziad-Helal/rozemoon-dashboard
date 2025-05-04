export type Currency = "SAR" | "USD";
export type SortDirection = "asc" | "desc";

export interface Document {
	id: number;
	documentUrl: string;
}

export interface Image {
	id: number;
	imageUrl: string;
}
