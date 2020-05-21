import { LatLngTuple } from "leaflet";

export const CAM_RADIUS = 10;

const toRadians = (angle: number) => angle * (Math.PI / 180);

export const getLatLng = (radius: number, angle: number): LatLngTuple => {
  return [
    radius * Math.cos(toRadians(angle)),
    radius * Math.sin(toRadians(angle)),
  ];
};

// const genCoordinates = (angle: number, sin: boolean) =>
// !sin
//   ? hypotenuse * Math.sin(toRadians(angle + directionAngle))
//   : hypotenuse * Math.cos(toRadians(angle + directionAngle));
