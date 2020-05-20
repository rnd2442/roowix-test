import React, { useEffect, useRef } from "react";
import { Map } from "react-leaflet";
import { CRS } from "leaflet";

type TState = {
  lat: number;
  lng: number;
  zoom: number;
};

export const PrimaryMap: React.FC = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    // @ts-ignore
    const map = mapRef.current.leafletElement;
    const bounds: [number, number][] = [
      [1165, 0],
      [0, 1648],
    ];
    // @ts-ignore
    const image = L.imageOverlay(
      "https://static.tildacdn.com/tild3965-6139-4564-b262-303737393665/_8.jpg",
      bounds
    ).addTo(map);

    map.fitBounds(image.getBounds());
  }, []);

  return (
    <Map
      // @ts-ignore
      ref={mapRef}
      minZoom={0}
      maxZoom={2}
      crs={CRS.Simple}
    >
      {}
    </Map>
  );
};
