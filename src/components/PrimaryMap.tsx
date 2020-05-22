import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map } from "react-leaflet";
import L, { CRS, LatLngTuple } from "leaflet";
import { appActions } from "../redux/actions/app.actions";
import { Camera } from "./Camera";
import { RootState } from "../types";
import { buildCamera } from "../utils";
import { SideForm } from "./SideForm";

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
    dispatch(
      appActions.createCamera(buildCamera([event.latlng.lat, event.latlng.lng]))
    );
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
      <SideForm />
      <Map
        ref={mapRef}
        minZoom={1}
        maxZoom={1}
        crs={CRS.Simple}
        maxBounds={bounds}
        ondblclick={createCam}
      >
        {cameras.map(([, camera]) => (
          <Camera key={camera.id} camera={camera} />
        ))}
      </Map>
    </>
  );
};
