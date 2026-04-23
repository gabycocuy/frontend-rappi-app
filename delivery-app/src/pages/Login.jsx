import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    if (data.role !== "delivery") {
      alert("This app is only for delivery users");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data));

    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <h1>Delivery Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button}>Login</button>
      </form>

      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "320px",
    margin: "80px auto",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    background: "#6c63ff",
    color: "white",
    border: "none",
  },
};
