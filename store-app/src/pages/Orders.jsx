import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const loadOrders = async () => {
      const data = await api.getStoreOrders(user.store.id);
      setOrders(Array.isArray(data) ? data : []);
    };

    loadOrders();
  }, []);

  const markReady = async (orderId) => {
    await api.updateOrderStatus(orderId, "READY");

    const data = await api.getStoreOrders(user.store.id);
    setOrders(data);
  };

  if (!user) return <p>No user</p>;

  return (
    <div>
      <h1>Store Orders</h1>

      {orders.length === 0 && <p>No orders</p>}

      {orders.map((order) => (
        <div key={order.id}>
          <p>ID: {order.id}</p>
          <p>Status: {order.status}</p>

          {order.items.map((item) => (
            <p key={item.id}>
              Product: {item.productId} | Qty: {item.quantity}
            </p>
          ))}

          {order.status === "PENDING" && (
            <button onClick={() => markReady(order.id)}>Mark as READY</button>
          )}
        </div>
      ))}
    </div>
  );
}
