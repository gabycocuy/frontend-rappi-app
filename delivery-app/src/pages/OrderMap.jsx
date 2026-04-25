import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { updatePosition } from "../api";

const STEP = 0.00005;

export default function OrderMap() {
  const { orderId } = useParams();

  const [position, setPosition] = useState({
    lat: 3.45,
    lng: -76.53,
  });

  const throttleRef = useRef(null);
  const pendingPosition = useRef(position);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let { lat, lng } = pendingPosition.current;

      switch (e.key) {
        case "ArrowUp":
          lat += STEP;
          break;
        case "ArrowDown":
          lat -= STEP;
          break;
        case "ArrowLeft":
          lng -= STEP;
          break;
        case "ArrowRight":
          lng += STEP;
          break;
        default:
          return;
      }

      const newPosition = { lat, lng };

      setPosition(newPosition);
      pendingPosition.current = newPosition;

      if (throttleRef.current) return;

      throttleRef.current = setTimeout(() => {
        updatePosition(orderId, pendingPosition.current);
        throttleRef.current = null;
      }, 1000);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (throttleRef.current) clearTimeout(throttleRef.current);
    };
  }, [orderId]);

  return (
    <div>
      <h2>Tracking Order</h2>

      <MapContainer
        center={[position.lat, position.lng]}
        zoom={18}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[position.lat, position.lng]} />
      </MapContainer>

      <p>Lat: {position.lat}</p>
      <p>Lng: {position.lng}</p>

      <p>Use arrow keys to move</p>
    </div>
  );
}
