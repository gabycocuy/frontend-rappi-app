const API = "http://localhost:3000";

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const handleResponse = async (res) => {
  const text = await res.text();

  try {
    const data = JSON.parse(text);

    if (!res.ok) {
      return { error: data.error || "Request failed" };
    }

    return data;
  } catch {
    return { error: "Invalid JSON response" };
  }
};

export const getAvailableOrders = async () => {
  const user = getUser();
  if (!user) return [];

  try {
    const res = await fetch(`${API}/orders/available`, {
      headers: {
        "x-user-id": user.id,
        "x-user-role": user.role,
      },
    });

    return await handleResponse(res);
  } catch {
    return { error: "Server error" };
  }
};

export const getMyOrders = async (deliveryId) => {
  const user = getUser();
  if (!user) return [];

  try {
    const res = await fetch(`${API}/orders/delivery/${deliveryId}`, {
      headers: {
        "x-user-id": user.id,
        "x-user-role": user.role,
      },
    });

    return await handleResponse(res);
  } catch {
    return { error: "Server error" };
  }
};

export const acceptOrder = async (orderId) => {
  const user = getUser();
  if (!user) return null;

  try {
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

    return await handleResponse(res);
  } catch {
    return { error: "Server error" };
  }
};

export const updatePosition = async (orderId, position) => {
  const user = getUser();
  if (!user) return null;

  try {
    const res = await fetch(`${API}/orders/${orderId}/position`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": user.id,
        "x-user-role": user.role,
      },
      body: JSON.stringify(position),
    });

    return await handleResponse(res);
  } catch {
    return { error: "Server error" };
  }
};

export const getOrderById = async (orderId) => {
  const user = getUser();
  if (!user) return null;

  try {
    const res = await fetch(`${API}/orders/${orderId}`, {
      headers: {
        "x-user-id": user.id,
        "x-user-role": user.role,
      },
    });

    return await handleResponse(res);
  } catch {
    return { error: "Server error" };
  }
};
