import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Products() {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await api.getProducts(storeId);
      setProducts(data);
    };

    loadProducts();
  }, [storeId]);

  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}

      <button onClick={() => navigate(`/create-order/${storeId}`)}>
        Crear orden con este store
      </button>
    </div>
  );
}
