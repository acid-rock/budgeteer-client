import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const link = import.meta.env.VITE_BACKEND_URL;

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Create local entry
  useEffect(() => {
    const createUser = async () => {
      const timezone = DateTime.now().zoneName;
      await axios.post(`${link}/users/createUser`, {
        id: user?.id,
        username: user?.username,
        timezone: timezone,
      });
    };

    if (isSignedIn) {
      createUser();
    }
  }, [isSignedIn, user?.id, user?.username]);

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
