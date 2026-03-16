export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Store Dashboard</h1>

      <p>Welcome {user.name}</p>

      <p>Store: {user.store?.name}</p>
    </div>
  );
}
