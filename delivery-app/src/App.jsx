import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AvailableOrders from "./pages/AvailableOrders";
import MyOrders from "./pages/MyOrders";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      {user && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
