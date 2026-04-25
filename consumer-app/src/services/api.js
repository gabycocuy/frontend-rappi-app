const API = "http://localhost:3000";

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    "Content-Type": "application/json",
    "x-user-id": user?.id,
    "x-user-role": user?.role,
  };
};

export const api = {
  async createOrder({ storeId, lat, lng }) {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(`${API}/orders`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        consumerId: user.id,
        storeId,
        lat,
        lng,
      }),
    });

    const data = await res.json();
    return data;
  },

  async getOrders() {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(`${API}/orders/consumer/${user.id}`, {
      headers: getHeaders(),
    });

    return res.json();
  },
};
