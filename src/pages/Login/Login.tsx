import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../lib/types";
import { useSignIn } from "@clerk/clerk-react";

export default function Login() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const attempt = await signIn.create({
        identifier: userData.username || "",
        password: userData.password,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error logging in - ", error);
    }
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
