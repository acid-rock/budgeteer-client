import { useEffect, useState } from "react";
import { Transaction } from "../lib/types";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const link = import.meta.env.VITE_BACKEND_URL;

interface FormProps {
  mode: string;
}

export default function Form(props: FormProps) {
  const { mode } = props;
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation().state?.from?.pathname || "/dashboard/";
  const [transaction, setTransaction] = useState<Transaction>({
    username: user?.username || "",
    user_id: user?.id || "",
    type: "income",
    amount: 0,
    category: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${link}/transactions/fetch/${id}`);

      setTransaction(response.data);
    };

    if (mode === "edit" && id !== undefined) {
      fetchData();
    }
  }, [mode, id]);

  // Handlers
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "add") {
      await axios.post(`${link}/transactions/create`, transaction);
    } else if (mode === "edit") {
      await axios.post(`${link}/transactions/update/${id}`, transaction);
    }

    navigate(location);
  };

  return (
    <>
      <h2>{mode} transaction</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Type: </label>
          <select name="type" onChange={handleSelectChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            name="amount"
            autoComplete="off"
            required
            value={transaction?.amount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Category: </label>
          <input
            type="text"
            name="category"
            autoComplete="off"
            required
            value={transaction?.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* TODO: Ensure that user cannot put future dates. */}
          <label>Date: </label>
          <input
            type="datetime-local"
            name="date"
            autoComplete="off"
            required
            value={transaction?.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            autoComplete="off"
            value={transaction?.description}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <button type="submit">Submit</button>
        &nbsp;
        <Link to={location}>Go back</Link>
      </form>
    </>
  );
}
