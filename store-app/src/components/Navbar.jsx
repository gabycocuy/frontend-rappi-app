import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/orders">Orders</Link>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
