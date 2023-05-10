export interface Location {
  city: string;
  postalCode: string;
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
  postalcode?: string;
  address?: string;
  quantity?: number;
  shelflife?: number;
  safetystock?: number;
  country?: string;
  weight?: number;
}

export enum ProgressStatus {
  InProgress = "InProgress",
  Completed = "Completed",
  Failed = "Failed",
}
