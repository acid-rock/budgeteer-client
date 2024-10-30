export type User = {
  email?: string;
  username?: string;
  password: string;
};

export type Account = {
  balance: number;
  income: number;
  expense: number;
};

export type Transaction = {
  id?: number;
  username: string;
  user_id: string;
  type: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
};
