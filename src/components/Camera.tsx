import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Circle, Polygon } from "react-leaflet";
import {
  Drawer,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
} from "rsuite";
import { appActions } from "../redux/actions/app.actions";
import { CAM_RADIUS, getPolygonVertexes } from "../utils";
import { TCamera } from "../types";
import { LatLngTuple } from "leaflet";

type TProps = {
  camera: TCamera;
};

type TState = {
  latLng: LatLngTuple;
  directionAngle: number;
  viewAngle: number;
  viewRange: number;
};

export const Camera: React.FC<TProps> = ({ camera }) => {
  const { id, latLng, directionAngle, viewAngle, viewRange } = camera;
  const dispatch = useDispatch();
  const [state, setState] = useState(false);

  const [params, setParams] = useState<TState>({
    latLng,
    directionAngle,
    viewAngle,
    viewRange,
  });

  const onClickHandler = () => {
    setState(true);
  };

  const onChangeHandler = (
    value: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    // @ts-ignore
    const name = event.target.name;

    if (!isNaN(+value)) {
      setParams((prev) => ({ ...prev, [name]: +value }));
    }
  };

  const submitHandler = () => {
    dispatch(appActions.updateCamera({ ...camera, ...params }));
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
          <Form>
            <FlexboxGrid justify="space-between">
              <FormGroup>
                <ControlLabel>НАПРАВЛЕНИЕ(°)</ControlLabel>
                <FormControl
                  name="directionAngle"
                  value={params.directionAngle.toString()}
                  onChange={onChangeHandler}
                  style={{ width: 160 }}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>УГОЛ ОБЗОРА(°)</ControlLabel>
                <FormControl
                  name="viewAngle"
                  value={params.viewAngle.toString()}
                  onChange={onChangeHandler}
                  style={{ width: 160 }}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>ДАЛЬНОСТЬ ОБЗОРА(М)</ControlLabel>
                <FormControl
                  name="viewRange"
                  value={params.viewRange.toString()}
                  onChange={onChangeHandler}
                  style={{ width: 160 }}
                />
              </FormGroup>
            </FlexboxGrid>
            <FlexboxGrid justify="space-between">
              <Button appearance="primary" onClick={submitHandler}>
                ПРИМЕНИТЬ
              </Button>
              <Button appearance="default">УДАЛИТЬ</Button>
            </FlexboxGrid>
          </Form>
        </Drawer.Body>
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
