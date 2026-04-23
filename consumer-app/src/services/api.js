const API = "http://localhost:3000";

const getUserHeader = () => {
  const user = localStorage.getItem("user");

  return user
    ? {
        "Content-Type": "application/json",
        user: user,
      }
    : {
        "Content-Type": "application/json",
      };
};

export const api = {
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
      headers: getUserHeader(),
      body: JSON.stringify(data),
    });

    return res.json();
  },

  getOrders: async (userId) => {
    const res = await fetch(`${API}/orders/consumer/${userId}`, {
      headers: getUserHeader(),
    });

    return res.json();
  },
};
