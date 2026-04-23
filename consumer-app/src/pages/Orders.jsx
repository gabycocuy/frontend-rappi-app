import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const loadOrders = async () => {
      const data = await api.getOrders();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  if (!user) return <p>No user</p>;

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 && <p>No orders</p>}

      {orders.map((order) => (
        <div key={order.id}>
          <p>{order.id}</p>
          <p>{order.status}</p>
        </div>
      ))}
    </div>
  );
}
