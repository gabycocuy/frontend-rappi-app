import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
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
          <Link to="/orders">Available Orders</Link>
          <Link to="/my-orders">My Orders</Link>

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
