import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

export default function Products() {
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await api.getProducts(storeId);
      setProducts(data);
    };

    loadProducts();
  }, [storeId]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      storeId: storeId,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
  };

  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
