import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Circle, Polygon, Polyline } from "react-leaflet";
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

  const polygonVertexes = getPolygonVertexes(
    latLng,
    directionAngle,
    viewAngle,
    viewRange
  );

  return (
    <>
      <Circle
        center={latLng}
        radius={CAM_RADIUS}
        fillOpacity={1}
        onClick={onClickHandler}
        className="camera-circle"
      />
      <Polygon
        fillOpacity={1}
        positions={polygonVertexes}
        className="camera-polygon"
      />
      <Polyline
        positions={[polygonVertexes[1], polygonVertexes[2]]}
        className="camera-polyline"
      />
    </>
  );
};
