const API = "http://localhost:3000";

export const getAvailableOrders = async () => {
  const res = await fetch(`${API}/orders/available`);

  return res.json();
};

export const acceptOrder = async (orderId, deliveryId) => {
  const res = await fetch(`${API}/orders/${orderId}/accept`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deliveryId }),
  });

  return res.json();
};

export const getMyOrders = async (deliveryId) => {
  const res = await fetch(`${API}/orders/delivery/${deliveryId}`);

  return res.json();
};
