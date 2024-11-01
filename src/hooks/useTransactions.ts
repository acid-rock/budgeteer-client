import axios from "axios";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const link = import.meta.env.VITE_BACKEND_URL;

export default function useTransactions(
  mode?: string,
  user_id: string | undefined
) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (mode === undefined) {
        try {
          const response = await axios.get(`${link}/transactions/fetch`);

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

      // Get 5 most recent transactions
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
      // Get current day transactions
      else if (mode === "daily") {
        const tz = DateTime.now().zoneName;

        try {
          const response = await axios.get(
            `${link}/transactions/fetchCurrent`,
            {
              params: { user_id: user_id, timezone: tz },
            }
          );

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
      // Get current week transactions
      else if (mode === "weekly") {
        const tz = DateTime.now().zoneName;

        try {
          const response = await axios.get(`${link}/transactions/fetchWeekly`, {
            params: { user_id: user_id, timezone: tz },
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
      // Get current month transactions
      else if (mode === "monthly") {
        const tz = DateTime.now().zoneName;

        try {
          const response = await axios.get(
            `${link}/transactions/fetchMonthly`,
            {
              params: { user_id: user_id, timezone: tz },
            }
          );

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
      // Get current year transactions
      else if (mode === "yearly") {
        const tz = DateTime.now().zoneName;

        try {
          const response = await axios.get(`${link}/transactions/fetchYearly`, {
            params: { user_id: user_id, timezone: tz },
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
