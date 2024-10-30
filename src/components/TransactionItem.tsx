import { Link, useLocation } from "react-router-dom";
import { TransactionProps } from "../lib/props";
import axios from "axios";

const link = import.meta.env.VITE_BACKEND_URL;

export default function TransactionItem(props: TransactionProps) {
  const location = useLocation();
  const { id, type, amount, category, date, description } = props;
  return (
    <>
      <hr />
      <h2>
        {type === "income" ? "+" : "-"}
        {amount}.00
      </h2>

      <p>
        <strong>{category}</strong>
      </p>
      <p>"{description || ""}"</p>

      <br />
      <i>{date}</i>

      <div>
        <Link
          to={`/dashboard/transactions/edit/${id}`}
          state={{ from: location }}
        >
          Edit
        </Link>
        &nbsp;
        <button
          onClick={async () => {
            await axios.delete(`${link}/transactions/delete/${id}`);
            window.location.reload();
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
