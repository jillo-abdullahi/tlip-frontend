export interface Location {
  city: string;
  state: string;
  country: string;
  address: string;
}

export interface Custodian {
  address: string;
  name: string;
  phone: string;
  email: string;
}

export enum EventType {
  Shipment = "Shipment",
  Receipt = "Receipt",
  Transfer = "Transfer",
}

export enum EventStatus {
  Transit = "Transit",
  Instock = "Instock",
  Delivered = "Delivered",
}

export interface Product {
  id: string;
  skucode: string;
  createdon: string;
  name: string;
  color?: string;
  price?: number;
  description?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  quantity?: number;
  shelfLife?: number;
  safetyStock?: number;
  country?: string;
  weight?: number;
}
