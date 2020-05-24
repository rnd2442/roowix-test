import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map, ImageOverlay } from "react-leaflet";
import L, { CRS, LatLngTuple } from "leaflet";
import { appActions } from "../redux/actions/app.actions";
import { Camera } from "./Camera";
import { RootState } from "../types";
import { buildCamera } from "../utils";
import { SideMenu } from "./SideMenu";

const bounds: LatLngTuple[] = [
  [1165, 0],
  [0, 1648],
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
        minZoom={1}
        maxZoom={1}
        crs={CRS.Simple}
        bounds={bounds}
        maxBounds={bounds}
        ondblclick={createCam}
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
