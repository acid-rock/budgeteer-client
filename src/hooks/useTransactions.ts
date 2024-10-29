import axios from "axios";
import { useEffect, useState } from "react";

const link = import.meta.env.VITE_BACKEND_URL;

export default function useTransactions(
  mode: string,
  user_id: string | undefined
) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (mode === "recent") {
        try {
          const response = await axios.get(`${link}/transactions/fetchRecent`, {
            params: { user_id: user_id },
          });

          const data = response.data;

          // Localize dates before sending to client
          for (const transaction of data) {
            transaction.date = new Date(transaction.date).toLocaleString();
          }

          setTransactions(data);
        } catch (error) {
          console.error("Error fetching data - ", error);
        }
      }
    };
    fetchData();
  }, [mode, user_id]);

  return transactions;
}
