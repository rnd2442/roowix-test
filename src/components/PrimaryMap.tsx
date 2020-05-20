import React, { useEffect, useRef } from "react";
import { Map } from "react-leaflet";
import L, { CRS, LatLngTuple } from "leaflet";

const bounds: LatLngTuple[] = [
  [1165, 0],
  [0, 1648],
];

export const PrimaryMap: React.FC = () => {
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    // Set bounds after map has mounted
    if (mapRef && mapRef.current) {
      // @ts-ignore
      const map = mapRef.current.leafletElement;
      const image = L.imageOverlay(
        "https://static.tildacdn.com/tild3965-6139-4564-b262-303737393665/_8.jpg",
        bounds
      ).addTo(map);
      map.fitBounds(image.getBounds());
    }
  }, []);

  return (
    <Map
      ref={mapRef}
      minZoom={1}
      maxZoom={1}
      crs={CRS.Simple}
      maxBounds={bounds}
    >
      {}
    </Map>
  );
};
