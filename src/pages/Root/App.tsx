import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <p>Welcome to Budgeteer!</p>
      <Link to="/login">Login</Link>
      &nbsp;
      <Link to="/register">Register</Link>
    </>
  );
}
