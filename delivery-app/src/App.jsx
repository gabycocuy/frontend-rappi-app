import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AvailableOrders from "./pages/AvailableOrders";
import MyOrders from "./pages/MyOrders";
import Register from "./pages/Register";
import OrderMap from "./pages/OrderMap";

import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />
          }
        />

        <Route
          path="/register"
          element={
            user ? <Navigate to="/dashboard" /> : <Register setUser={setUser} />
          }
        />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/orders"
          element={user ? <AvailableOrders /> : <Navigate to="/" />}
        />

        <Route
          path="/my-orders"
          element={user ? <MyOrders /> : <Navigate to="/" />}
        />

        <Route
          path="/order/:orderId"
          element={user ? <OrderMap /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
