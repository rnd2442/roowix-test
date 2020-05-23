import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Circle, Polygon, Polyline } from "react-leaflet";
import { appActions } from "../redux/actions/app.actions";
import { CAM_RADIUS, getPolygonVertexes } from "../utils";
import { TCamera, RootState } from "../types";

type TProps = {
  camera: TCamera;
};

export const Camera: React.FC<TProps> = ({ camera }) => {
  const { id, latLng, directionAngle, viewAngle, viewRange } = camera;
  const dispatch = useDispatch();

  const { currentCameraId, isOpened } = useSelector((state: RootState) => {
    return state.app.sideFormProps;
  });

  const [circleClass, setCircleClass] = useState("camera-circle");

  useEffect(() => {
    setCircleClass(
      id === currentCameraId && isOpened
        ? "camera-circle-toggled"
        : "camera-circle"
    );
  }, [currentCameraId, isOpened]);

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
        key={`${id}-${circleClass}`}
        center={latLng}
        radius={CAM_RADIUS}
        fillOpacity={1}
        onClick={onClickHandler}
        className={circleClass}
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
