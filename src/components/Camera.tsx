import React from "react";
import { Circle, Polygon } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { CAM_RADIUS, getPolygonVertexes } from "../utils";

type TProps = {
  centerPoint: LatLngTuple;
  directionAngle: number;
  viewAngle: number;
  viewRange: number;
};

export const Camera: React.FC<TProps> = ({
  centerPoint,
  directionAngle,
  viewAngle,
  viewRange,
}) => {
  return (
    <>
      <Circle center={centerPoint} radius={CAM_RADIUS} attribution="test" />
      <Polygon
        positions={getPolygonVertexes(
          centerPoint,
          directionAngle,
          viewAngle,
          viewRange
        )}
      />
    </>
  );
};
