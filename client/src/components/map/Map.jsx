import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ items }) {
  const position = [items[0].latitude, items[0].longtude]
  console.log(position);
  return (
    <MapContainer
      center={
        items.length === 1
          ? position
          : [52.4797, -1.90269]
      }
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    <Marker position={position}>
      <Popup>
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
      </Popup>
    </Marker>
    
    </MapContainer>
  );
}

export default Map;