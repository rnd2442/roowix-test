import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { buildCamera } from "../utils";
import { RootState } from "../types";
import { LatLngTuple } from "leaflet";

type TState = {
  latLng: LatLngTuple;
  directionAngle: number;
  viewAngle: number;
  viewRange: number;
};

export const SideForm: React.FC = ({}) => {
  const dispatch = useDispatch();
  const { sideFormProps, cameras } = useSelector((state: RootState) => {
    return state.app;
  });
  const { isOpened, currentCameraId } = sideFormProps;

  const camera = new Map(cameras).get(currentCameraId) || buildCamera();
  const { latLng, directionAngle, viewAngle, viewRange } = camera;

  const [params, setParams] = useState<TState>({
    latLng,
    directionAngle,
    viewAngle,
    viewRange,
  });

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

  const removeHandler = () => {
    dispatch(appActions.removeCamera(currentCameraId));
  };

  const getInput = (label: string, name: keyof TState) => {
    return (
      <FormGroup>
        <ControlLabel style={{ textTransform: "uppercase" }}>
          {label}
        </ControlLabel>
        <FormControl
          name={name}
          value={params[name].toString()}
          onChange={onChangeHandler}
          style={{ width: 160 }}
        />
      </FormGroup>
    );
  };

  return (
    <Drawer
      show={isOpened}
      onHide={() => dispatch(appActions.closeCameraProps())}
      backdrop={false}
      backdropClassName="transparent-backdrop"
      keyboard
    >
      <Drawer.Header>
        <Drawer.Title>{`Camera ${currentCameraId}`}</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <Form>
          <FlexboxGrid justify="space-between">
            {getInput("направление(°)", "directionAngle")}
            {getInput("угол обзора(°)", "viewAngle")}
            {getInput("дальность обзора(м)", "viewRange")}
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
  );
};
