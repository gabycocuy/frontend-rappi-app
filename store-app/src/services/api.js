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
  async getStoreOrders(storeId) {
    const res = await fetch(`${API}/orders/store/${storeId}`, {
      headers: getHeaders(),
    });

    return res.json();
  },

  async updateOrderStatus(orderId, status) {
    const res = await fetch(`${API}/orders/${orderId}/status`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });

    return res.json();
  },
};
