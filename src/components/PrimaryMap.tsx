import React, { useEffect, useRef, useState } from "react";
import { Map, Circle, Polygon } from "react-leaflet";
import L, { CRS, LatLngTuple } from "leaflet";

const CAM_RADIUS = 10;
const ANGLE_SHIFT = 90;

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
    const directionAngle = 90;
    const viewAngle = 60; //deg
    const viewRange = 12;

    const hypotenuse = viewRange / Math.sin(toRadians(viewAngle / 2));

    const genCoordinates = (angle: number, sin: boolean) =>
      !sin
        ? hypotenuse * Math.sin(toRadians(angle + directionAngle))
        : hypotenuse * Math.cos(toRadians(angle + directionAngle));

    const firstShift: LatLngTuple = [
      genCoordinates(viewAngle / 2, true),
      genCoordinates(viewAngle / 2, false),
    ];

    const secondShift: LatLngTuple = [
      genCoordinates(-viewAngle / 2, true),
      genCoordinates(-viewAngle / 2, false),
    ];

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
