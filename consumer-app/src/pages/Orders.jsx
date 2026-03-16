import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await api.getOrders();

      setOrders(data);
    };

    loadOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div key={order.id}>Order ID: {order.id}</div>
      ))}
    </div>
  );
}
