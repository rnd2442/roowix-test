import React from "react";
import { useDispatch } from "react-redux";
import { Circle, Polygon } from "react-leaflet";
import { appActions } from "../redux/actions/app.actions";
import { CAM_RADIUS, getPolygonVertexes } from "../utils";
import { TCamera } from "../types";

type TProps = {
  camera: TCamera;
};

export const Camera: React.FC<TProps> = ({ camera }) => {
  const { id, latLng, directionAngle, viewAngle, viewRange } = camera;
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(appActions.openCameraProps(id));
  };

  return (
    <>
      <Circle center={latLng} radius={CAM_RADIUS} onClick={onClickHandler} />
      <Polygon
        positions={getPolygonVertexes(
          latLng,
          directionAngle,
          viewAngle,
          viewRange
        )}
      />
    </>
  );
};
