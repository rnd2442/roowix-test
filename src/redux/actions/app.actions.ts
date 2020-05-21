import { CREATE_CAMERA, UPDATE_CAMERA } from "../constants/app.constants";
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

export const appActions = {
  createCamera,
  updateCamera,
};
