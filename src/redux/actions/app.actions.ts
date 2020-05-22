import {
  CREATE_CAMERA,
  UPDATE_CAMERA,
  REMOVE_CAMERA,
} from "../constants/app.constants";
import { TCamera } from "../../types";
import { TIdCameraTuple } from "../types/app.types";

const createCamera = (camera: TCamera) => ({
  type: CREATE_CAMERA,
  payload: [camera.id, camera] as TIdCameraTuple,
});

const updateCamera = (camera: TCamera) => ({
  type: UPDATE_CAMERA,
  payload: [camera.id, camera] as TIdCameraTuple,
});

const removeCamera = (id: string) => ({
  type: REMOVE_CAMERA,
  payload: id,
});

export const appActions = {
  createCamera,
  updateCamera,
  removeCamera,
};
