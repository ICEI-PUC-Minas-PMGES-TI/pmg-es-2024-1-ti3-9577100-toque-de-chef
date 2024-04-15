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
};

export type Purchase = {
  id: number;
  purchaseDate: Date;
  suplyer: Suplyer;
  purchaseItems: Purchase[];
};

export type PurchaseResponse = {
  count: number;
  obj: Purchase[];
};
