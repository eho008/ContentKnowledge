import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export default function Login({ handleLogin }: { handleLogin: () => void }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const login = async () => {
        axios.defaults.withCredentials = true;
        await axios
          .post(`${import.meta.env.VITE_BASE_URL}auth/login`, {
            email: email,
            password: password,
          })
          .then(() => {
            handleLogin();
            navigate("/");
          });
      };
      login();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Nickname or email</label>
      <input
        name="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
