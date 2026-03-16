import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      {!user && (
        <>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/stores">Stores</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>

          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    background: "#eee",
  },
};
