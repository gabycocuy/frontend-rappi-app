import { useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { api } from "../services/api";

function LocationSelector({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

export default function CreateOrderMap() {
  const { storeId } = useParams(); // 🔥 IMPORTANTE

  const [position, setPosition] = useState(null);

  const handleCreate = async () => {
    if (!position) {
      alert("Selecciona ubicación");
      return;
    }

    console.log("STORE ID:", storeId); // 👈 para verificar

    const order = await api.createOrder({
      storeId,
      lat: position.lat,
      lng: position.lng,
    });

    console.log(order);

    if (order?.error) {
      alert(order.error);
      return;
    }

    alert("Orden creada");
  };

  return (
    <div>
      <h2>Selecciona destino</h2>

      <MapContainer
        center={[3.45, -76.53]}
        zoom={15}
        style={{ height: "500px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationSelector setPosition={setPosition} />
        {position && <Marker position={[position.lat, position.lng]} />}
      </MapContainer>

      <button onClick={handleCreate}>Crear orden</button>
    </div>
  );
}
