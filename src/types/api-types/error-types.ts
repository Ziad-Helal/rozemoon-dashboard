export interface ApiError {
  title: string;
  status: number;
  type: string;
  traceId: string;
  details?: string;
  errors?: {
    [key: string]: string;
  };
}
