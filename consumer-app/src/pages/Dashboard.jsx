import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h1>No user logged</h1>;
  }

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>

      <p>Welcome {user.name}</p>
      <p>Role: {user.role}</p>

      <div style={styles.buttons}>
        <button onClick={() => navigate("/stores")}>Browse Stores</button>

        <button onClick={() => navigate("/cart")}>Cart</button>

        <button onClick={() => navigate("/orders")}>My Orders</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: "80px",
  },

  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
};
