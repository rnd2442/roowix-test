import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, FlexboxGrid, InputGroup, Schema } from "rsuite";
import { appActions } from "../../redux/actions/app.actions";
import { TCamera } from "../../types";
import { convertToDM, convertToLatlng } from "../../utils";
import { ValueInput } from "./ValueInput";
import { CoordInput } from "./CoordInput";
import { ClearButton } from "./ClearButton";
import { LatLngTuple } from "leaflet";

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

const initCoords = (latLng: LatLngTuple) => ({
  latDeg: convertToDM(latLng[0])[0].toString(),
  latMin: convertToDM(latLng[0])[1].toString() + ",",
  lngDeg: convertToDM(latLng[1])[0].toString(),
  lngMin: convertToDM(latLng[1])[1].toString(),
});

const { StringType, NumberType } = Schema.Types;

const whole = /^\d+$/;
const WholeDecimal = /^\d*(\.\d+)?$/;

const negativeWhole = /^-?\d+$/;
const negativeWholeDecimal = /^-?\d*(\.\d+)?$/;

const model = Schema.Model({
  directionAngle: NumberType()
    .pattern(negativeWhole, "Integer from -360 to 360")
    .range(-360, 360)
    .isRequired("Integer from -360 to 360"),
  viewAngle: NumberType()
    .pattern(whole, "Integer from 1 to 179")
    .range(1, 179)
    .isRequired("Integer from 1 to 179"),
  viewRange: NumberType()
    .pattern(WholeDecimal, "Positive Integer")
    .isRequired("Positive Integer"),
});

export const CameraFrom: React.FC<TProps> = ({ camera }) => {
  const dispatch = useDispatch();
  const { id, latLng, directionAngle, viewAngle, viewRange } = camera;

  const [params, setParams] = useState<TParams>({
    directionAngle,
    viewAngle,
    viewRange,
  });

  const [coords, setCoords] = useState<TDegMinutes>(initCoords(latLng));

  useEffect(() => {
    // This refreshes inputs after submit
    setParams({
      directionAngle,
      viewAngle,
      viewRange,
    });

    setCoords(initCoords(latLng));
  }, [latLng, directionAngle, viewAngle, viewRange]);

  const onChangeCoordsHandler = (
    value: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const { name } = event.target as HTMLInputElement;

    let preparedValue = value;

    // Remove extra comma between lat anf lng before validation
    if (name === "latMin") preparedValue = value.split(",")[0];

    if (preparedValue === "." || !isNaN(+preparedValue)) {
      // Restore comma between lat and lng
      if (name === "latMin") preparedValue += ",";

      setCoords((prev) => ({ ...prev, [name]: preparedValue }));
    }
  };

  const onChangeParamsHandler = (
    value: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const { name } = event.target as HTMLInputElement;

    // @ts-ignore
    const test = model.checkForField(name, +value);

    const testAll = model.check({ ...params });

    // console.log(testAll);

    const permittedChars = /^[-.0-9]*$/;
    console.log(permittedChars.test(value));
    if (!isNaN(+value)) {
      // if (permittedChars.test(value)) {
      setParams((prev) => ({ ...prev, [name]: +value }));
    }
  };

  const clearInputHandler = (event: React.SyntheticEvent) => {
    const { id } = event.currentTarget as HTMLAnchorElement;

    const name = id.split("_")[1] as keyof TParams | "latLng";
    if (name === "latLng") {
      setCoords(initCoords(latLng));
      return;
    }

    setParams((prev) => ({ ...prev, [name]: camera[name] }));
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

  const coordInputs = Object.keys(coords) as (keyof TDegMinutes)[];

  const paramInputs: [keyof TParams, string][] = [
    ["directionAngle", "направление(°)"],
    ["viewAngle", "угол обзора(°)"],
    ["viewRange", "дальность обзора(м)"],
  ];

  return (
    <>
      <FlexboxGrid justify="start" className="cam-params">
        <FlexboxGrid.Item colspan={14}>
          <label className="cam-params-label">{"коррдинаты"}</label>
          <InputGroup className="cam-params-coordinates">
            {coordInputs.map((name) => (
              <CoordInput
                key={name}
                name={name}
                value={coords[name].toString()}
                callback={onChangeCoordsHandler}
              />
            ))}
            <ClearButton name="latLng" callback={clearInputHandler} />
          </InputGroup>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <FlexboxGrid justify="space-between" className="cam-params">
        {paramInputs.map(([name, label]) => (
          <ValueInput
            key={name}
            label={label}
            name={name}
            value={params[name].toString()}
            callback={onChangeParamsHandler}
            clearButton={
              <ClearButton name={name} callback={clearInputHandler} />
            }
          />
        ))}
      </FlexboxGrid>
      <FlexboxGrid justify="space-between" className="cam-params">
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
