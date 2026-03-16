import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <h1>Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{ border: "1px solid", margin: "10px", padding: "10px" }}
        >
          <p>Status: {order.status}</p>
          <p>Consumer: {order.consumerId}</p>
        </div>
      ))}
    </div>
  );
}
