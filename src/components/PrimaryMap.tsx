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

    const genLatlng = (latlng: L.LatLng, shift: boolean): LatLngTuple => {
      return shift
        ? [latlng.lat + 5, latlng.lng + 30]
        : [latlng.lat - 15, latlng.lng - 25];
    };

    const arr: LatLngTuple[] = [
      [event.latlng.lat, event.latlng.lng],
      genLatlng(event.latlng, true),
      genLatlng(event.latlng, false),
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
