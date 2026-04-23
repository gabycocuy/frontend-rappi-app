const API = "http://localhost:3000";

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getAvailableOrders = async () => {
  const user = getUser();
  if (!user) return [];

  const res = await fetch(`${API}/orders/available`, {
    headers: {
      "x-user-id": user.id,
      "x-user-role": user.role,
    },
  });

  return res.json();
};

export const getMyOrders = async (deliveryId) => {
  const user = getUser();
  if (!user) return [];

  const res = await fetch(`${API}/orders/delivery/${deliveryId}`, {
    headers: {
      "x-user-id": user.id,
      "x-user-role": user.role,
    },
  });

  return res.json();
};

export const acceptOrder = async (orderId) => {
  const user = getUser();
  if (!user) return null;

  const res = await fetch(`${API}/orders/${orderId}/accept`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": user.id,
      "x-user-role": user.role,
    },
    body: JSON.stringify({
      deliveryId: user.id,
    }),
  });

  return res.json();
};
