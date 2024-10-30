import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import TransactionItem from "../../../../components/TransactionItem";
import useTransactions from "../../../../hooks/useTransactions";
import { TransactionProps } from "../../../../lib/props";
import { Link, useLocation } from "react-router-dom";

export default function TransactionList() {
  const { isLoaded, user } = useUser();
  const [mode, setMode] = useState("daily");
  const transactions = useTransactions(mode, user?.id);
  const location = useLocation();

  // Handlers
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  if (!isLoaded) return null;
  return (
    <>
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
          <>
            <p>No transactions yet</p>
            <Link to="add" state={{ from: location }}>
              Add new transaction...
            </Link>
          </>
        )}
      </>
    </>
  );
}
