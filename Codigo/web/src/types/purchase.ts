import { Product } from "./product";
import { Suplyer } from "./suplyer";

export type PurchaseDto = {
  suplyerId: number;
  purchaseItems: PurchaseItemDto[];
};

export type PurchaseItemDto = {
  productId: number;
  quantity: number;
  unitPrice: number;
};

export type PurchaseItem = {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  categoryId: number;
  quantity: number;
  product: Product;
};

export type Purchase = {
  id: number;
  purchaseDate: Date;
  suplyer: Suplyer;
  purchaseItems: PurchaseItem[];
};

export type PurchaseToUpdateDto = {
  id: number;
  suplyerId: number;
  purchaseItems: PurchaseItemDto[];
};

export type PurchaseResponse = {
  count: number;
  obj: Purchase[];
};

export interface purchaseDashboard {
  name: string;
  value: number;
}

export interface PurchaseDashboardResponse {
  purchases: Purchase[];
}

export interface MonthPurchaseResponse {
  lastPurchaseDate: string;
  totalThisMonth: number;
  averageMonthlySpending: number;
}
