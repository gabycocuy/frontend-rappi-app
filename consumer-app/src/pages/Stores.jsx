import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStores = async () => {
      const data = await api.getStores();
      setStores(data);
    };

    loadStores();
  }, []);

  return (
    <div>
      <h1>Stores</h1>

      {stores.map((store) => (
        <div key={store.id}>
          <h3>{store.name}</h3>

          <button onClick={() => navigate(`/products/${store.id}`)}>
            View Products
          </button>
        </div>
      ))}
    </div>
  );
}
