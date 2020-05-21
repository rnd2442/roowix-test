import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map } from "react-leaflet";
import L, { CRS, LatLngTuple } from "leaflet";
import { Drawer } from "rsuite";
import { appActions } from "../redux/actions/app.actions";
import { Camera } from "./Camera";
import { TCamera, RootState } from "../types";

const bounds: LatLngTuple[] = [
  [1165, 0],
  [0, 1648],
];

export const PrimaryMap: React.FC = () => {
  const dispatch = useDispatch();
  const { cameras } = useSelector((state: RootState) => {
    return state.app;
  });

  const mapRef = useRef<Map>(null);

  const createCam = (event: L.LeafletMouseEvent) => {
    const centerPoint: LatLngTuple = [event.latlng.lat, event.latlng.lng];
    const directionAngle = 30;
    const viewAngle = 45; //deg
    const viewRange = 22;

    const newCamera: TCamera = {
      id: new Date().toISOString(),
      latLng: [event.latlng.lat, event.latlng.lng],
      directionAngle,
      viewAngle,
      viewRange,
    };

    dispatch(appActions.createCamera(newCamera));
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

  const [state, setState] = useState(false);

  return (
    <>
      <Drawer
        show={state}
        onHide={() => setState(false)}
        backdropClassName="transparent-backdrop"
      >
        <Drawer.Header>
          <Drawer.Title>Camera</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body></Drawer.Body>
        <Drawer.Footer></Drawer.Footer>
      </Drawer>
    <Map
      ref={mapRef}
      minZoom={1}
      maxZoom={1}
      crs={CRS.Simple}
      maxBounds={bounds}
      onclick={createCam}
    >
      {cameras.map((camera) => (
        <Camera
          key={camera.id}
          centerPoint={camera.latLng}
          directionAngle={camera.directionAngle}
          viewAngle={camera.viewAngle}
          viewRange={camera.viewRange}
        />
      ))}
    </Map>
    </>
  );
};
