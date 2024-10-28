import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    await signUp.create({
      emailAddress: data.email,
      username: data.username,
      password: data.password,
    });

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (error) {
      console.error("Error signing up - ", error);
    }

    setVerifying(true);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });
      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error verifying code - ", error);
    }
  };

  if (verifying)
    return (
      <>
        <form onSubmit={handleCodeSubmit}>
          <div>
            <label>OTP Code</label>
          </div>
          <br />
          <input
            type="text"
            name="code"
            placeholder="Enter OTP code here..."
            value={code}
            onChange={handleCodeChange}
          />
          &nbsp;
          <button type="submit">Submit</button>
        </form>
      </>
    );

  return (
    <>
      <form onSubmit={handleInfoSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={data.username}
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
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">Submit</button>
        &nbsp;
        <Link to="/">Go back</Link>
      </form>
    </>
  );
}
