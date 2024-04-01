export type Category = {
  id: number;
  name: string;
  description: string;
};

export type CategoryResponse = {
  obj: Category[];
};
