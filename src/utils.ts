import { LatLngTuple } from "leaflet";

export const CAM_RADIUS = 5;

const toRadians = (angle: number) => angle * (Math.PI / 180);

export const getLatLng = (radius: number, angle: number): LatLngTuple => {
  return [
    radius * Math.cos(toRadians(angle)),
    radius * Math.sin(toRadians(angle)),
  ];
};

export const sumLatlng = (
  first: LatLngTuple,
  second: LatLngTuple
): LatLngTuple => {
  return [first[0] + second[0], first[1] + second[1]];
};
