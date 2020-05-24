import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map, ImageOverlay } from "react-leaflet";
import L, { CRS, LatLngTuple } from "leaflet";
import { appActions } from "../redux/actions/app.actions";
import { Camera } from "./Camera";
import { RootState } from "../types";
import { buildCamera } from "../utils";
import { SideMenu } from "./SideMenu";

const scale = 0.5;
const oversize = 175;
const a = 1165 * scale;
const b = 1648 * scale;

const bounds: LatLngTuple[] = [
  [a, 0],
  [0, b],
];

const maxBounds: LatLngTuple[] = [
  [a + oversize, 0 - oversize],
  [0 - oversize, b + oversize],
];

export const PrimaryMap: React.FC = () => {
  const dispatch = useDispatch();
  const { cameras } = useSelector((state: RootState) => {
    return state.app;
  });

  const createCam = (event: L.LeafletMouseEvent) => {
    const newCam = buildCamera([event.latlng.lat, event.latlng.lng]);

    dispatch(appActions.createCamera(newCam));
    dispatch(appActions.openCameraProps(newCam.id));
  };

  return (
    <>
      <Map
        minZoom={2}
        maxZoom={2}
        crs={CRS.Simple}
        bounds={bounds}
        maxBounds={maxBounds}
        ondblclick={createCam}
        doubleClickZoom={false}
      >
        <ImageOverlay
          bounds={bounds}
          url="https://static.tildacdn.com/tild3965-6139-4564-b262-303737393665/_8.jpg"
        />
        {cameras.map(([, camera]) => (
          <Camera key={camera.id} camera={camera} />
        ))}
      </Map>
      <SideMenu />
    </>
  );
};
