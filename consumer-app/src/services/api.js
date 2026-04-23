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
  async getStores() {
    const res = await fetch(`${API}/stores`);
    return res.json();
  },

  async getProducts(storeId) {
    const res = await fetch(`${API}/products?storeId=${storeId}`);

    if (!res.ok) return [];

    return res.json();
  },

  async createOrder(data) {
    const res = await fetch(`${API}/orders`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return res.json();
  },

  async getOrders() {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(`${API}/orders/consumer/${user.id}`, {
      headers: getHeaders(),
    });

    return res.json();
  },
};
