import { useEffect, useState } from "react";
import { Account } from "../lib/types";
import { TransactionProps } from "../lib/props";

export default function useAccount(transactions: TransactionProps[]) {
  const [account, setAccount] = useState<Account>({
    balance: 0,
    income: 0,
    expense: 0,
  });

  useEffect(() => {
    const calculateAccount = () => {
      let income = 0;
      let expense = 0;

      for (const transaction of transactions) {
        if (transaction.type === "income") {
          income += transaction.amount;
        } else if (transaction.type === "expense") {
          expense += transaction.amount;
        }
      }

      setAccount({
        balance: income - expense,
        income: income,
        expense: expense,
      });
    };

    calculateAccount();
  }, [transactions]);
  return account;
}
