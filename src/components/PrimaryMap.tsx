import React, { useEffect, useRef, useState } from "react";
import { Map, Circle, Polygon } from "react-leaflet";
import L, { CRS, LatLngTuple } from "leaflet";
import { CAM_RADIUS, getLatLng } from "../utils";

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
    const directionAngle = 45;
    const viewAngle = 45; //deg
    const viewRange = 12;

    const hypotenuse = viewRange / Math.sin(toRadians(viewAngle / 2));

    const firstShift: LatLngTuple = getLatLng(
      hypotenuse,
      viewAngle / 2 + directionAngle
    );

    const secondShift: LatLngTuple = getLatLng(
      hypotenuse,
      -viewAngle / 2 + directionAngle
    );

    const genLatlng = (latlng: L.LatLng, shift: LatLngTuple): LatLngTuple => {
      return [latlng.lat + shift[0], latlng.lng + shift[1]];
    };

    const arr: LatLngTuple[] = [
      [event.latlng.lat, event.latlng.lng],
      genLatlng(event.latlng, firstShift),
      genLatlng(event.latlng, secondShift),
    ];

    setCircle(
      <>
        <Circle center={event.latlng} radius={CAM_RADIUS} attribution="test" />
        <Polygon positions={arr} />
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
