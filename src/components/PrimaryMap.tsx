import React, { useEffect, useRef, useState } from "react";
import { Map, Circle, Polygon } from "react-leaflet";
import L, { CRS, LatLngTuple } from "leaflet";
import { CAM_RADIUS, getLatLng, sumLatlng } from "../utils";

const bounds: LatLngTuple[] = [
  [1165, 0],
  [0, 1648],
];

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}

export const PrimaryMap: React.FC = () => {
  const mapRef = useRef<Map>(null);

  const [circle, setCircle] = useState<JSX.Element>(<></>);

  const createCam = (event: L.LeafletMouseEvent) => {
    const centerPoint: LatLngTuple = [event.latlng.lat, event.latlng.lng];
    const directionAngle = 30;
    const viewAngle = 45; //deg
    const viewRange = 22;

    // Find hypotenuse by viewRange and angle
    const hypotenuse = viewRange / Math.sin(toRadians(viewAngle / 2));

    // Calc vertexes by found hypotenuse and angle
    const firstVertex: LatLngTuple = getLatLng(
      hypotenuse,
      viewAngle / 2 + directionAngle
    );

    const secondVertex: LatLngTuple = getLatLng(
      hypotenuse,
      -viewAngle / 2 + directionAngle
    );

    // Triangle start position must be shifted by circle's radius
    const shiftedCenter = sumLatlng(
      centerPoint,
      getLatLng(CAM_RADIUS, directionAngle)
    );

    const trianle: LatLngTuple[] = [
      shiftedCenter,
      sumLatlng(shiftedCenter, firstVertex),
      sumLatlng(shiftedCenter, secondVertex),
    ];

    setCircle(
      <>
        <Circle center={event.latlng} radius={CAM_RADIUS} attribution="test" />
        <Polygon positions={trianle} />
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
