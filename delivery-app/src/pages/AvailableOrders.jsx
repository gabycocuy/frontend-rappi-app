import { useEffect, useState } from "react";
import { getAvailableOrders, acceptOrder } from "../api";

export default function AvailableOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleAccept = async (id) => {
    await acceptOrder(id, user.id);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAvailableOrders();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Available Orders</h2>

      {orders.map((order) => (
        <div key={order.id}>
          <p>Order: {order.id}</p>

          <button onClick={() => handleAccept(order.id)}>Accept</button>
        </div>
      ))}
    </div>
  );
}
