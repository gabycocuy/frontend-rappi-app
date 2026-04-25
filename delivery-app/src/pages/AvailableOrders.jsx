import { useEffect, useState } from "react";
import { getAvailableOrders, acceptOrder } from "../api";
import { useNavigate } from "react-router-dom";

export default function AvailableOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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

  const handleAccept = async (orderId) => {
    await acceptOrder(orderId);
    navigate(`/order/${orderId}`);
  };

  return (
    <div>
      <h2>Available Orders</h2>

      {orders.length === 0 && <p>No orders</p>}

      {orders.map((order) => (
        <div key={order.id}>
          <p>{order.id}</p>

          <button onClick={() => handleAccept(order.id)}>Accept</button>
        </div>
      ))}
    </div>
  );
}
