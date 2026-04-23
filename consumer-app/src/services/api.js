const API = "http://localhost:3000";

export const api = {
  register: async (data) => {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  login: async (data) => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  getStores: async () => {
    const res = await fetch(`${API}/stores`);
    return res.json();
  },

  getProducts: async (storeId) => {
    const res = await fetch(`${API}/products?storeId=${storeId}`);
    return res.json();
  },

  createOrder: async (data) => {
    const res = await fetch(`${API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  getOrders: async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(`${API}/orders/consumer/${user.id}`);
    return res.json();
  },
};
