import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FlexboxGrid,
  InputGroup,
  Input,
  Icon,
} from "rsuite";
import { appActions } from "../redux/actions/app.actions";
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

export const CameraMenu: React.FC<TProps> = ({ camera }) => {
  const dispatch = useDispatch();
  const { id, latLng, directionAngle, viewAngle, viewRange } = camera;

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
    dispatch(appActions.closeCameraProps());
    dispatch(appActions.removeCamera(id));
  };

  const getCloseButton = () => (
    <InputGroup.Button>
      <Icon icon="close" />
    </InputGroup.Button>
  );

  const getInput = (label: string, name: keyof TState) => {
    return (
      <FormGroup>
        <ControlLabel style={{ textTransform: "uppercase" }}>
          {label}
        </ControlLabel>
        <InputGroup style={{ width: 160 }}>
          <Input
            name={name}
            value={params[name].toString()}
            onChange={onChangeHandler}
          />
          {getCloseButton()}
        </InputGroup>
      </FormGroup>
    );
  };

  const coordinatesHandler = (
    value: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    // @ts-ignore
    const name = event.target.name;

    console.log(name, value);
    // if (!isNaN(+value)) {
    //   setParams((prev) => ({ ...prev, [name]: +value }));
    // }
  };

  return (
    <Form>
      <FlexboxGrid justify="space-between">
        <FormGroup>
          <ControlLabel style={{ textTransform: "uppercase" }}>
            {"коррдинаты"}
          </ControlLabel>
          <InputGroup style={{ width: 360 }}>
            <Input
              name="lat"
              value={params.latLng[0].toString()}
              onChange={coordinatesHandler}
            />
            <InputGroup.Addon style={{ background: "white" }}>
              ,
            </InputGroup.Addon>
            <Input
              name="lng"
              value={params.latLng[1].toString()}
              onChange={coordinatesHandler}
            />
            {getCloseButton()}
          </InputGroup>
        </FormGroup>
      </FlexboxGrid>
      <FlexboxGrid justify="space-between">
        {getInput("направление(°)", "directionAngle")}
        {getInput("угол обзора(°)", "viewAngle")}
        {getInput("дальность обзора(м)", "viewRange")}
      </FlexboxGrid>
      <FlexboxGrid justify="space-between">
        <Button appearance="primary" onClick={submitHandler}>
          ПРИМЕНИТЬ
        </Button>
        <Button appearance="default" onClick={removeHandler}>
          УДАЛИТЬ
        </Button>
      </FlexboxGrid>
    </Form>
  );
};
