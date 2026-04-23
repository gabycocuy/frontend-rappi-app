import { useState } from "react";
import { api } from "../services/api";

export default function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  const createOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const storeId = cart[0].storeId;

    const items = cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    await api.createOrder({
      consumerId: user.id,
      storeId,
      items,
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
          {p.name} - ${p.price} x {p.quantity}
        </div>
      ))}

      <button onClick={createOrder}>Create Order</button>
    </div>
  );
}
