export type Suplyer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string;
};
export type NewSuplyer = {
  id: number;
  newName: string;
  newEmail: string;
  newPhone: string;
  newDescription: string;
};

export type SuplyerResponse = {
  obj: Suplyer[];
};
