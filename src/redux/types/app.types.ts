import { appActions } from "../actions/app.actions";
import { TCamera } from "../../types";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type TIdCameraTuple = [string, TCamera];

export type TAppState = {
  cameras: readonly TIdCameraTuple[];
  sideFormProps: {
    isOpened: boolean;
    currentCameraId: string;
  };
};

export type TAppActions = ReturnType<InferValueTypes<typeof appActions>>;
