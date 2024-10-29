import { useUser } from "@clerk/clerk-react";
import useTransactions from "../../../hooks/useTransactions";
import { TransactionProps } from "../../../lib/props";
import TransactionItem from "../../../components/TransactionItem";
import useAccount from "../../../hooks/useAccount";

export default function DashboardIndex() {
  const { isLoaded, user } = useUser();
  const transactions = useTransactions("recent", user?.id);
  const account = useAccount(transactions);

  if (!isLoaded) return null;

  return (
    <>
      <h2>Welcome, {user?.username}</h2>

      <h3>Balance: {account.balance}.00</h3>
      <p>Income: {account.income}.00</p>
      <p>Expenses: {account.expense}.00</p>

      <hr />

      <h2>Most recent transactions</h2>

      {transactions.length ? (
        transactions.map((transaction: TransactionProps) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))
      ) : (
        <>No transactions yet</>
      )}
    </>
  );
}
