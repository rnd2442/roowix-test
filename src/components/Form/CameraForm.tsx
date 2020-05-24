import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, FlexboxGrid, InputGroup } from "rsuite";
import { appActions } from "../../redux/actions/app.actions";
import { TCamera, TParams } from "../../types";
import { convertToLatlng, initCoords, initParams } from "../../utils";
import { ValueInput } from "./ValueInput";
import { CoordInput } from "./CoordInput";
import { ClearButton } from "./ClearButton";
import { model } from "./schema";

type TProps = {
  camera: TCamera;
};

export const CameraFrom: React.FC<TProps> = ({ camera }) => {
  const dispatch = useDispatch();
  const { id, latLng } = camera;

  const [params, setParams] = useState<TParams>(initParams(camera));
  const [errors, setErrors] = useState(model.check({ ...params }));

  useEffect(() => {
    // This refreshes inputs after submit
    setParams(initParams(camera));
  }, [camera]);

  const onChangeParamsHandler = (
    value: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const { name } = event.target as HTMLInputElement;
    let preparedVal = value;

    // Remove extra comma between lat and lng before validation
    if (name === "latMin") preparedVal = value.split(",")[0];

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
        permittedChars = /^\d*(\.\d+)?$/;
        break;
      case "latDeg":
      case "lngDeg":
        permittedChars = /^-?\d{0,8}$/;
        break;
      case "latMin":
      case "lngMin":
        permittedChars = /^-?\d{0,8}(\.\d{0,8})?$/;
        break;
    }

    if (permittedChars.test(preparedVal)) {
      // Restore comma between lat and lng
      if (name === "latMin") preparedVal += ",";

      setParams((prev) => ({ ...prev, [name]: preparedVal }));
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
      setParams((prev) => ({ ...prev, ...initCoords(latLng) }));
      return;
    }

    setParams((prev) => ({ ...prev, [name]: camera[name].toString() }));
  };

  const submitHandler = () => {
    // Remove extra comma
    const latMin = params.latMin.split(",")[0];

    const testAll = model.check({ ...params, latMin });
    setErrors(testAll);
    console.log(testAll.latMin, params.latMin);

    // Do not apply changes if there is invalid field
    let isValid = true;
    for (let key in testAll) {
      if (testAll[key as keyof TParams].hasError) {
        isValid = false;
        return;
      }
    }

    if (!isValid) return;

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
            isError={errors[name].hasError}
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
