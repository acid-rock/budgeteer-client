import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function App() {
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
