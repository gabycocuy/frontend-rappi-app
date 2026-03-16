import { useState } from "react";
import { api } from "../services/api";

export default function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  const createOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    await api.createOrder({
      consumerId: user.id,
      items: cart,
    });

    localStorage.removeItem("cart");

    setCart([]);

    alert("Order created");
  };

  return (
    <div>
      <h1>Cart</h1>

      {cart.map((p, i) => (
        <div key={i}>
          {p.name} - ${p.price}
        </div>
      ))}

      <button onClick={createOrder}>Create Order</button>
    </div>
  );
}
