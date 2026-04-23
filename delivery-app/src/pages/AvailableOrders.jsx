import { useEffect, useState } from "react";
import { getAvailableOrders, acceptOrder } from "../api";

export default function AvailableOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await getAvailableOrders();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  return (
    <div>
      <h2>Available Orders</h2>

      {orders.length === 0 && <p>No orders</p>}

      {orders.map((order) => (
        <div key={order.id}>
          <p>{order.id}</p>

          <button onClick={() => acceptOrder(order.id)}>Accept</button>
        </div>
      ))}
    </div>
  );
}
