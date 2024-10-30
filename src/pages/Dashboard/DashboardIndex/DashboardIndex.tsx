import { useUser } from "@clerk/clerk-react";
import useTransactions from "../../../hooks/useTransactions";
import { TransactionProps } from "../../../lib/props";
import TransactionItem from "../../../components/TransactionItem";
import useAccount from "../../../hooks/useAccount";
import { Link, useLocation } from "react-router-dom";

export default function DashboardIndex() {
  const { isLoaded, user } = useUser();
  const transactions = useTransactions("recent", user?.id);
  const account = useAccount(transactions);
  const location = useLocation();

  if (!isLoaded) return null;

  return (
    <>
      <h2>Welcome, {user?.username}</h2>

      <h3>Balance: {account.balance}.00</h3>
      <p>Income: {account.income}.00</p>
      <p>Expenses: {account.expense}.00</p>

      <hr />

      <div>
        <h2>Most recent transactions</h2>
        <Link to="transactions/add" state={{ from: location }}>
          Add new transaction...
        </Link>
      </div>

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
  );
}
