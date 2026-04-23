import { useState } from "react";
import { api } from "../services/api";

export default function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  const createOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || cart.length === 0) return;

    const data = await api.createOrder({
      consumerId: user.id,
      storeId: cart[0].storeId,
      items: cart.map((p) => ({
        productId: p.productId,
        quantity: p.quantity || 1,
      })),
    });

    if (data?.error) {
      alert(data.error);
      return;
    }

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
