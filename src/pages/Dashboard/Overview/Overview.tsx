import { DateTime } from "luxon";
import useTransactions from "../../../hooks/useTransactions";
import { useUser } from "@clerk/clerk-react";
import useAccount from "../../../hooks/useAccount";

export default function Overview() {
  const currentMonth = DateTime.now().toFormat("LLLL");
  const { user } = useUser();
  const transactions = useTransactions("monthly", user?.id);
  const account = useAccount(transactions);

  return (
    <>
      <h2>{currentMonth} financial breakdown</h2>

      <h2>
        <i>Income</i>
      </h2>
      <p>Total monthly income: {account.income}.00</p>
      <p>Main income source: "Category"</p>
      <p>
        Avg income/day: {Math.round(account.income / transactions.length)}.00
      </p>
      <p>vs. previous month: 0%</p>

      <h2>
        <i>Expenses</i>
      </h2>
      <p>Total monthly expenses: {account.expense}.00</p>
      <p>Mostly spent on: "Category"</p>
      <p>
        Avg expense/day: {Math.round(account.expense / transactions.length)}.00
      </p>
      <p>vs. previous month: 0%</p>
      <p>Largest expense amount: 0.00</p>
    </>
  );
}
