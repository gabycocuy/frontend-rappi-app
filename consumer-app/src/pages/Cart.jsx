import { useState } from "react";
import { api } from "../services/api";

export default function Cart() {
  const [cart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const createOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No user");
      return;
    }

    if (cart.length === 0) {
      alert("Cart vacío");
      return;
    }

    if (!cart[0].storeId) {
      alert("Error: producto sin storeId");
      console.log(cart);
      return;
    }

    const data = await api.createOrder({
      storeId: cart[0].storeId,
      lat: 3.44,
      lng: -76.53,
    });

    console.log(data);

    if (data?.error) {
      alert(data.error);
      return;
    }

    localStorage.removeItem("cart");
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
