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
  Pending = "Pending",
  Completed = "Completed",
  Cancelled = "Cancelled",
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

export interface NewProduct {
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

export enum ProgressStatus {
  InProgress = "InProgress",
  Completed = "Completed",
  Failed = "Failed",
}

export interface ProductEvent {
  id: string;
  item_id: string;
  eventtimestamp: string;
  eventtype: EventType;
  eventstatus: EventStatus;
  location: string;
  custodian: string;
  notes: string;
}
