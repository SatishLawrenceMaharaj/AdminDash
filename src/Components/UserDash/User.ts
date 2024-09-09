export type User = {
  id: number;
  name: string;
  status: string;
  inventoryValue: number;
  lastLogin: string;
  email: string;
  image: string;
  location: { lat: number; lng: number };
  registrationDate: string;
  totalOrders: number;
  activityData: { date: string; loginCount: number; engagementTime: number }[];
  products: {
    id: number;
    name: string;
    type: string;
    value: number;
    quantity: number;
    sku: string;
    status: string;
    data: { name: string; quantity: number; value: number }[];
  }[];
  userData: {
    userName: string;
    totalValue: number;
  };
};

export interface Product {
  id: number;
  name: string;
  type: string;
  value: number;
  quantity: number;
  sku: string;
  status: string;
  data: { name: string; quantity: number; value: number }[];
}

export interface Data {
  name: string;
  quantity: number;
  value: number;
}

export interface UserData {
  userName: string;
  totalValue: number;
}
