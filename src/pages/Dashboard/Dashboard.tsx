import { useUser } from "@clerk/clerk-react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  const { isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <>
      <h1>Budgeteer</h1>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        &nbsp;
        <Link to="transactions">Transactions</Link>
      </nav>

      <hr />

      <Outlet />
    </>
  );
}
