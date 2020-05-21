import { LatLngTuple } from "leaflet";

export type TCamera = {
  id: string;
  latLng: LatLngTuple;
  directionAngle: number;
  viewAngle: number;
  viewRange: number;
};
