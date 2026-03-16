import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        role: "store",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Store created");

    navigate("/");
  };

  return (
    <div>
      <h1>Create Store</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Owner name" onChange={handleChange} />

        <input name="email" placeholder="Email" onChange={handleChange} />

        <input name="password" placeholder="Password" onChange={handleChange} />

        <input
          name="storeName"
          placeholder="Store name"
          onChange={handleChange}
        />

        <button>Create Store</button>
      </form>
    </div>
  );
}
