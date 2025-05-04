export interface Address {
  id: number;
  country: string;
  gLocation: string;
  shortName: string;
  fullAddress: string;
  isDefault: boolean;
  floor?: number;
  buildingNumber?: string;
  streetName?: string;
  district?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  nearestLandmark?: string;
  latitude?: string;
  longitude?: string;
  pictureUrl?: string;
}
