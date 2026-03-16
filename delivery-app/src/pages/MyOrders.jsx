import { useEffect, useState } from "react";
import { getMyOrders } from "../api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getMyOrders(user.id);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}
