import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FlexboxGrid,
  InputGroup,
  Input,
  Icon,
} from "rsuite";
import { appActions } from "../redux/actions/app.actions";
import { TCamera } from "../types";
import { convertToDM, convertToLatlng } from "../utils";

type TProps = {
  camera: TCamera;
};

type TState = {
  directionAngle: number;
  viewAngle: number;
  viewRange: number;
};

type TDegMinutes = {
  latDeg: number;
  latMin: number;
  lngDeg: number;
  lngMin: number;
};

export const CameraMenu: React.FC<TProps> = ({ camera }) => {
  const dispatch = useDispatch();
  const { id, latLng, directionAngle, viewAngle, viewRange } = camera;

  const [params, setParams] = useState<TState>({
    directionAngle,
    viewAngle,
    viewRange,
  });

  const [coords, setCoords] = useState<TDegMinutes>({
    latDeg: convertToDM(latLng[0])[0],
    latMin: convertToDM(latLng[0])[1],
    lngDeg: convertToDM(latLng[1])[0],
    lngMin: convertToDM(latLng[1])[1],
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
    dispatch(
      appActions.updateCamera({
        ...camera,
        ...params,
        latLng: [
          convertToLatlng(coords.latDeg, coords.latMin),
          convertToLatlng(coords.lngDeg, coords.lngMin),
        ],
      })
    );
  };

  const removeHandler = () => {
    dispatch(appActions.closeCameraProps());
    dispatch(appActions.removeCamera(id));
  };

  const clearInputHandler = (event: React.SyntheticEvent) => {
    // @ts-ignore
    const name = event.target.name;
    console.log(event.target, name);
  };

  const getCloseButton = (name: keyof TState | "latLng") => (
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
          {getCloseButton(name)}
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

    if (!isNaN(+value)) {
      setCoords((prev) => ({ ...prev, [name]: +value }));
    }
  };

  const getLatLngInput = (name: keyof TDegMinutes) => {
    const len = coords[name].toString().length;
    return (
      <Input
        // style={{
        //   width: `${len * 4}px`,
        // }}
        // style={{
        //   width: `5px`,
        // }}
        name={name}
        value={coords[name].toString()}
        onChange={coordinatesHandler}
      />
    );
  };

  return (
    <Form>
      <FlexboxGrid justify="space-between">
        <FormGroup>
          <ControlLabel style={{ textTransform: "uppercase" }}>
            {"коррдинаты"}
          </ControlLabel>
          <InputGroup style={{ width: 360 }}>
            {getLatLngInput("latDeg")}
            <InputGroup.Addon style={{ background: "white" }} />
            {getLatLngInput("latMin")}
            <InputGroup.Addon style={{ background: "white" }}>
              ,
            </InputGroup.Addon>
            {getLatLngInput("lngDeg")}
            <InputGroup.Addon style={{ background: "white" }} />
            {getLatLngInput("lngMin")}
            {getCloseButton("latLng")}
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
