export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  type: number;
};

export type UserInfoType = {
  name: string;
  email: string;
  type: number;
};
