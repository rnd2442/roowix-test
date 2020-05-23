import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, FlexboxGrid, InputGroup, Input, Icon } from "rsuite";
import { appActions } from "../redux/actions/app.actions";
import { TCamera } from "../types";
import { convertToDM, convertToLatlng } from "../utils";
import { ValueInput } from "./ValueInput";

type TProps = {
  camera: TCamera;
};

type TParams = {
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

  const initCoords = () => ({
    latDeg: convertToDM(latLng[0])[0].toString(),
    latMin: convertToDM(latLng[0])[1].toString() + ",",
    lngDeg: convertToDM(latLng[1])[0].toString(),
    lngMin: convertToDM(latLng[1])[1].toString(),
  });

  const [params, setParams] = useState<TParams>({
    directionAngle,
    viewAngle,
    viewRange,
  });

  const [coords, setCoords] = useState<TDegMinutes>(initCoords());

  const onChangeHandler = (
    value: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const { name } = event.target as HTMLInputElement;

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
    const { id } = event.currentTarget as HTMLAnchorElement;

    const name = id.split("_")[1] as keyof TParams | "latLng";
    if (name === "latLng") {
      setCoords(initCoords());
      return;
    }

    setParams((prev) => ({ ...prev, [name]: camera[name] }));
  };

  const getClearButton = (name: keyof TParams | "latLng") => (
    <InputGroup.Addon style={{ background: "white" }}>
      <Icon
        className="clear-btn"
        icon="close-circle"
        id={`clearBtn_${name}`}
        onClick={clearInputHandler}
      />
    </InputGroup.Addon>
  );

  const coordinatesHandler = (
    value: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const { name } = event.target as HTMLInputElement;

    let preparedValue = value;

    // Remove comma between lat anf lng before validation
    if (name === "latMin") preparedValue = value.split(",")[0];

    if (preparedValue === "." || !isNaN(+preparedValue)) {
      // Restore comma between lat and lng
      if (name === "latMin") preparedValue += ",";

      setCoords((prev) => ({ ...prev, [name]: preparedValue }));
    }
  };

  const getLatLngInput = (name: keyof TDegMinutes) => {
    const len = coords[name].toString().length;
    return (
      <Input
        style={{
          width: `${len * 7 + 5}px`,
        }}
        name={name}
        value={coords[name].toString()}
        onChange={coordinatesHandler}
      />
    );
  };

  return (
    <>
      <label className="cam-params-label">{"коррдинаты"}</label>
      <InputGroup className="cam-params-coordinates">
        {getLatLngInput("latDeg")}
        {getLatLngInput("latMin")}
        {getLatLngInput("lngDeg")}
        {getLatLngInput("lngMin")}
        {getClearButton("latLng")}
      </InputGroup>
      <FlexboxGrid justify="space-between">
        <ValueInput
          label="направление(°)"
          name="directionAngle"
          value={params.directionAngle.toString()}
          callback={onChangeHandler}
        >
          {getClearButton("directionAngle")}
        </ValueInput>
        <ValueInput
          label="угол обзора(°)"
          name="viewAngle"
          value={params.viewAngle.toString()}
          callback={onChangeHandler}
        >
          {getClearButton("viewAngle")}
        </ValueInput>
        <ValueInput
          label="дальность обзора(м)"
          name="viewRange"
          value={params.viewRange.toString()}
          callback={onChangeHandler}
        >
          {getClearButton("viewRange")}
        </ValueInput>
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
    </>
  );
};
