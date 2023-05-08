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
