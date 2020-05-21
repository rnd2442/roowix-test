import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Circle, Polygon } from "react-leaflet";
import { Drawer, Button } from "rsuite";
import { appActions } from "../redux/actions/app.actions";
import { CAM_RADIUS, getPolygonVertexes } from "../utils";
import { TCamera } from "../types";

type TProps = {
  camera: TCamera;
};

export const Camera: React.FC<TProps> = ({ camera }) => {
  const { id, latLng, directionAngle, viewAngle, viewRange } = camera;
  const dispatch = useDispatch();
  const [state, setState] = useState(false);

  const onClickHandler = () => {
    console.log(id);
    setState(true);
  };

  const btnHandler = () => {
    dispatch(appActions.updateCamera({ ...camera, viewRange: viewRange + 10 }));
  };

  return (
    <>
      <Drawer
        show={state}
        onHide={() => setState(false)}
        backdropClassName="transparent-backdrop"
      >
        <Drawer.Header>
          <Drawer.Title>{`Camera ${id}`}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Button onClick={btnHandler}>Change</Button>
        </Drawer.Body>
        <Drawer.Footer></Drawer.Footer>
      </Drawer>
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
