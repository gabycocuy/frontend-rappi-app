import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "consumer",
    storeName: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("User created!");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <select name="role" onChange={handleChange} style={styles.input}>
          <option value="consumer">Consumer</option>
          <option value="delivery">Delivery</option>
          <option value="store">Store</option>
        </select>

        {form.role === "store" && (
          <input
            name="storeName"
            placeholder="Store name"
            onChange={handleChange}
            style={styles.input}
          />
        )}

        <button style={styles.button}>Create account</button>
      </form>
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
