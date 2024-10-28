import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function App() {
  const { isLoaded } = useUser();

  // Manage the loading state here.
  if (!isLoaded) return null;

  return (
    <>
      <p>Welcome to Budgeteer!</p>

      <SignedOut>
        <Link to="/login">Login</Link>
        &nbsp;
        <Link to="/register">Register</Link>
      </SignedOut>

      <SignedIn>
        <UserButton />
        <Link to="/dashboard">Dashboard</Link>
      </SignedIn>
    </>
  );
}
