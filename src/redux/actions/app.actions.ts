import { CREATE_CAMERA } from "../constants/app.constants";
import { TCamera } from "../../types";

const createCamera = (camera: TCamera) => ({
  type: CREATE_CAMERA,
  payload: camera,
});

export const appActions = {
  createCamera,
};
