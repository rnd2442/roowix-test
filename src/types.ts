import { LatLngTuple } from "leaflet";
import { rootReducer } from "./redux/reducers/rootReducer";

export type TCamera = {
  readonly id: string;
  readonly latLng: LatLngTuple;
  readonly directionAngle: number;
  readonly viewAngle: number;
  readonly viewRange: number;
};

export type TParams = {
  directionAngle: string;
  viewAngle: string;
  viewRange: string;
  latDeg: string;
  latMin: string;
  lngDeg: string;
  lngMin: string;
};

export type RootState = ReturnType<typeof rootReducer>;
