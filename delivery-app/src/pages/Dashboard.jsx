import { useState } from "react";

export default function Dashboard() {
  const [user] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  if (!user) {
    return <p>You must login first</p>;
  }

  return (
    <div>
      <h1>Delivery Dashboard</h1>

      <p>Welcome {user.email}</p>

      <p>You can:</p>

      <ul>
        <li>View available orders</li>
        <li>Accept deliveries</li>
        <li>Check your deliveries</li>
      </ul>
    </div>
  );
}
