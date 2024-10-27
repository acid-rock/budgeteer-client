import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../lib/types";

export default function Login() {
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(userData);

    // TODO: Send user data to backend.
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">Login</button>
        &nbsp;
        <Link to={"/"}>Go back</Link>
      </form>
    </>
  );
}
