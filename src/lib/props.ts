export interface TransactionProps {
  id?: number;
  username: string;
  user_id: string;
  type: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}
