import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

//styles
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>Email :</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          //two ways binding
        />
      </label>
      <label>
        <span>Password :</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <div className="center">
        {isPending ? (
          <button disabled className="btn loading">
            Loading ...
          </button>
        ) : (
          <button className="btn">Login</button>
        )}
        {error && <p className="error">{error.message}</p>}
      </div>
    </form>
  );
}
