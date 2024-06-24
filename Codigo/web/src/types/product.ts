import { Category } from "./category";

export type ProductDto = {
  name: string;
  description: string;
  categoryId: number;
};

export type Product = {
  id: number;
  name: string;
  stockQtd: number;
  description: string;
  categoryId: number;
  category: Category;
};

export type ProductResponse = {
  count: number;
  obj: Product[];
};

export interface ProductDashboard {
  name: string;
  entrada: number;
  saida: number;
  precoMedio: number;
  maiorPreco: number;
  menorPreco: number;
}

export interface ProductDashboardResponse {
  products: ProductDashboard[];
  totalItems: number;
  totalPages: number;
}
