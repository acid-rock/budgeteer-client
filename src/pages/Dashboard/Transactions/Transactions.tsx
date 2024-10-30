import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import useTransactions from "../../../hooks/useTransactions";
import { TransactionProps } from "../../../lib/props";
import TransactionItem from "../../../components/TransactionItem";

export default function Transactions() {
  const { isLoaded, user } = useUser();
  const [mode, setMode] = useState("daily");
  const transactions = useTransactions(mode, user?.id);

  if (!isLoaded) return null;

  // Handlers
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  return (
    <>
      <h2>
        {user?.username}'s {mode} transactions
      </h2>

      <select onChange={handleSelectChange}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {transactions.length ? (
        transactions.map((transaction: TransactionProps) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))
      ) : (
        <p>No transactions yet</p>
      )}
    </>
  );
}
