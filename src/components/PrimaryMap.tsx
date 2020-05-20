import React, { useEffect, useRef, useState } from "react";
import { Map, Circle, Polygon } from "react-leaflet";
import L, { CRS, LatLngTuple } from "leaflet";

const CAM_RADIUS = 10;

const bounds: LatLngTuple[] = [
  [1165, 0],
  [0, 1648],
];

export const PrimaryMap: React.FC = () => {
  const mapRef = useRef<Map>(null);

  const [circle, setCircle] = useState<JSX.Element>(<></>);

  const createCam = (event: L.LeafletMouseEvent) => {
    console.log(event.latlng);

    setCircle(
      <>
        <Circle center={event.latlng} radius={CAM_RADIUS} attribution="test" />
      </>
    );
  };

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
      onclick={createCam}
    >
      {circle}
    </Map>
  );
};
