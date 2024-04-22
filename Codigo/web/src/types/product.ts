import { Category } from "./category";

export type ProductDto = {
  name: string;
  description: string;
  categoryId: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  category: Category;
};

export type ProductResponse = {
  count: number;
  obj: Product[];
};
