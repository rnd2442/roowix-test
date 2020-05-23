import { LatLngTuple } from "leaflet";
import { TCamera } from "./types";

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

export const getPolygonVertexes = (
  centerPoint: LatLngTuple,
  directionAngle: number,
  viewAngle: number,
  viewRange: number
): LatLngTuple[] => {
  // Find hypotenuse by viewRange and angle
  const hypotenuse = viewRange / Math.cos(toRadians(viewAngle / 2));

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

  return [
    shiftedCenter,
    sumLatlng(shiftedCenter, firstVertex),
    sumLatlng(shiftedCenter, secondVertex),
  ];
};

export const buildCamera = (latLng: LatLngTuple = [0, 0]): TCamera => ({
  id: new Date().toISOString(),
  latLng,
  directionAngle: 0,
  viewAngle: 30,
  viewRange: 100,
});

export const convertToDM = (val: number): [number, number] => {
  const degrees = Math.trunc(val);
  const minutes = (val % 1) * 60;

  return [degrees, minutes];
};

export const convertToLatlng = (degrees: number, minutes: number) =>
  degrees + minutes / 60;
