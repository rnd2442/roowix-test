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

const { NumberType } = Schema.Types;

type TProps = {
  camera: TCamera;
};

type TParams = {
  directionAngle: string;
  viewAngle: string;
  viewRange: string;
  latDeg: string;
  latMin: string;
  lngDeg: string;
  lngMin: string;
};

const initCoords = (latLng: LatLngTuple) => ({
  latDeg: convertToDM(latLng[0])[0].toString(),
  latMin: convertToDM(latLng[0])[1].toFixed(5) + ",",
  lngDeg: convertToDM(latLng[1])[0].toString(),
  lngMin: convertToDM(latLng[1])[1].toFixed(5),
});

const whole = /^\d+$/;
const wholeDecimal = /^\d*(\.\d+)?$/;

const negativeWhole = /^-?\d+$/;
const negativeWholeDecimal = /^-?\d*(\.\d+)?$/;

const testRegex = /[0-9]\d*(\.\d+)?/;

const errText = "Некорректное значение";
const model = Schema.Model({
  directionAngle: NumberType().pattern(negativeWhole, errText).range(-360, 360),
  viewAngle: NumberType().pattern(whole, errText).range(1, 179),
  viewRange: NumberType().pattern(wholeDecimal, errText),
  latDeg: NumberType().pattern(negativeWhole, errText),
  latMin: NumberType().pattern(negativeWholeDecimal, errText),
  lngDeg: NumberType().pattern(negativeWhole, errText),
  lngMin: NumberType().pattern(negativeWholeDecimal, errText),
});

const initParams = (camera: TCamera): TParams => ({
  directionAngle: camera.directionAngle.toString(),
  viewAngle: camera.viewAngle.toString(),
  viewRange: camera.viewRange.toString(),
  ...initCoords(camera.latLng),
});

export const CameraFrom: React.FC<TProps> = ({ camera }) => {
  const dispatch = useDispatch();
  const { id, latLng } = camera;

  const [params, setParams] = useState<TParams>(initParams(camera));

  useEffect(() => {
    // This refreshes inputs after submit
    setParams(initParams(camera));
  }, [camera]);

  const onChangeParamsHandler = (
    value: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const { name } = event.target as HTMLInputElement;

    // Remove extra comma between lat anf lng before validation
    if (name === "latMin") value = value.split(",")[0];

    // Do not allow input letters and etc from keyboard
    let permittedChars = /^\d+$/;

    switch (name as keyof TParams) {
      case "directionAngle":
        permittedChars = /^-?\d{0,3}$/;
        break;
      case "viewAngle":
        permittedChars = /^\d{0,3}$/;
        break;
      case "viewRange":
        permittedChars = wholeDecimal;
        break;
      case "latDeg":
      case "lngDeg":
        permittedChars = /^-?\d{0,8}$/;
        break;
      case "latMin":
      case "lngMin":
        permittedChars = /^-?\d*(\.\d{0,8})?$/;
        break;
    }

    if (permittedChars.test(value)) {
      // Restore comma between lat and lng
      if (name === "latMin") value += ",";

      setParams((prev) => ({ ...prev, [name]: value }));
    }
  };

  const clearInputHandler = (event: React.SyntheticEvent) => {
    const { id } = event.currentTarget as HTMLAnchorElement;

    const name = id.split("_")[1] as
      | "directionAngle"
      | "viewAngle"
      | "viewRange"
      | "latLng";

    if (name === "latLng") {
      // setCoords(initCoords(latLng));
      setParams((prev) => ({ ...prev, ...initCoords(latLng) }));
      return;
    }

    setParams((prev) => ({ ...prev, [name]: camera[name].toString() }));
  };

  const submitHandler = () => {
    // Remove extra comma
    const latMin = params.latMin.split(",")[0];

    const testAll = model.check({ ...params });
    console.log(testAll);

    dispatch(
      appActions.updateCamera({
        ...camera,
        directionAngle: +params.directionAngle,
        viewAngle: +params.viewAngle,
        viewRange: +params.viewRange,
        latLng: [
          convertToLatlng(+params.latDeg, +latMin),
          convertToLatlng(+params.lngDeg, +params.lngMin),
        ],
      })
    );
  };

  const removeHandler = () => {
    dispatch(appActions.closeCameraProps());
    dispatch(appActions.removeCamera(id));
  };

  const coordInputs = ["latDeg", "latMin", "lngDeg", "lngMin"] as (
    | "latDeg"
    | "latMin"
    | "lngDeg"
    | "lngMin"
  )[];

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
                value={params[name]}
                callback={onChangeParamsHandler}
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
            value={params[name]}
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
