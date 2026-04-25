import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { api } from "../services/api";

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await api.getOrderById(orderId);
      setOrder(data);
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 2000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <MapContainer
      center={[order.destination_lat, order.destination_lng]}
      zoom={15}
      style={{ height: "500px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[order.destination_lat, order.destination_lng]} />

      {order.delivery_lat && (
        <Marker position={[order.delivery_lat, order.delivery_lng]} />
      )}
    </MapContainer>
  );
}
