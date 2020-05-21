import { LatLngTuple } from "leaflet";
import { rootReducer } from "./redux/reducers/rootReducer";

export type TCamera = {
  id: string;
  latLng: LatLngTuple;
  directionAngle: number;
  viewAngle: number;
  viewRange: number;
};

export type RootState = ReturnType<typeof rootReducer>;
