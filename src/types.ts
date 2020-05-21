import { LatLngTuple } from "leaflet";
import { rootReducer } from "./redux/reducers/rootReducer";

export type TCamera = {
  readonly id: string;
  readonly latLng: LatLngTuple;
  readonly directionAngle: number;
  readonly viewAngle: number;
  readonly viewRange: number;
};

export type RootState = ReturnType<typeof rootReducer>;
