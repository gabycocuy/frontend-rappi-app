import { useEffect, useState } from "react";
import { getMyOrders } from "../api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(user.id);

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
          setError(data.error || "Error loading orders");
        }
      } catch (err) {
        setOrders([]);
        setError(err.message || "Server error");
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <p>No user logged</p>;
  }

  return (
    <div>
      <h2>My Orders</h2>

      {error && <p>{error}</p>}

      {orders.length === 0 && !error && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}
