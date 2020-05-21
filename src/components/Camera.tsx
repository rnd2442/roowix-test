import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Circle, Polygon } from "react-leaflet";
import {
  Drawer,
  Button,
  Input,
  InputGroup,
  Icon,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  ButtonToolbar,
} from "rsuite";
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

  const onChangeHandler = (
    value: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    // @ts-ignore
    const name = event.target.name;

    if (!isNaN(+value)) {
      dispatch(appActions.updateCamera({ ...camera, [name]: +value }));
    }
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
                  value={directionAngle.toString()}
                  onChange={onChangeHandler}
                  style={{ width: 160 }}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>УГОЛ ОБЗОРА(°)</ControlLabel>
                <FormControl
                  name="viewAngle"
                  value={viewAngle.toString()}
                  onChange={onChangeHandler}
                  style={{ width: 160 }}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>ДАЛЬНОСТЬ ОБЗОРА(М)</ControlLabel>
                <FormControl
                  name="viewRange"
                  value={viewRange.toString()}
                  onChange={onChangeHandler}
                  style={{ width: 160 }}
                />
              </FormGroup>
            </FlexboxGrid>
            <FlexboxGrid justify="space-between">
              <Button appearance="primary">ПРИМЕНИТЬ</Button>
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
