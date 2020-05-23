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
  latDeg: string;
  latMin: string;
  lngDeg: string;
  lngMin: string;
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
    latDeg: convertToDM(latLng[0])[0].toString(),
    latMin: convertToDM(latLng[0])[1].toString() + ",",
    lngDeg: convertToDM(latLng[1])[0].toString(),
    lngMin: convertToDM(latLng[1])[1].toString(),
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
    const latMin = coords.latMin.split(",")[0];
    dispatch(
      appActions.updateCamera({
        ...camera,
        ...params,
        latLng: [
          convertToLatlng(+coords.latDeg, +latMin),
          convertToLatlng(+coords.lngDeg, +coords.lngMin),
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
    <InputGroup.Addon>
      <Icon
        className="clear-btn"
        icon="close-circle"
        name={name}
        onClick={clearInputHandler}
      />
    </InputGroup.Addon>
  );

  const getInput = (label: string, name: keyof TState) => {
    return (
      <FormGroup>
        <ControlLabel className="cam-params-label">{label}</ControlLabel>
        <InputGroup inside className="cam-params-group">
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

    let preparedValue = value;
    if (name === "latMin") {
      preparedValue = value.split(",")[0];
      console.log(value, preparedValue);
    }

    if (preparedValue === "." || !isNaN(+preparedValue)) {
      if (name === "latMin") {
        preparedValue += ",";
      }
      setCoords((prev) => ({ ...prev, [name]: preparedValue }));
    }
  };

  const getLatLngInput = (
    name: keyof TDegMinutes,
    width: number,
    delim: string = ""
  ) => {
    const len = coords[name].toString().length;
    return (
      <Input
        style={{
          width: `${len * 8 + 5}px`,
        }}
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
          <ControlLabel className="cam-params-label">
            {"коррдинаты"}
          </ControlLabel>
          <InputGroup className="cam-params-coordinates">
            {getLatLngInput("latDeg", 40)}
            {getLatLngInput("latMin", 60)}
            {getLatLngInput("lngDeg", 40)}
            {getLatLngInput("lngMin", 60)}
          </InputGroup>
        </FormGroup>
      </FlexboxGrid>
      <FlexboxGrid justify="space-between">
        {getInput("направление(°)", "directionAngle")}
        {getInput("угол обзора(°)", "viewAngle")}
        {getInput("дальность обзора(м)", "viewRange")}
      </FlexboxGrid>
      <FlexboxGrid justify="space-between">
        <Button
          onClick={submitHandler}
          style={{ color: "white", background: "#00379e" }}
        >
          СОХРАНИТЬ
        </Button>
        <Button
          onClick={removeHandler}
          style={{ color: "white", background: "#F44336" }}
        >
          УДАЛИТЬ
        </Button>
      </FlexboxGrid>
    </Form>
  );
};
