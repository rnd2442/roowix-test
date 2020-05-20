import {
  CREATE_CAMERA,
  UPDATE_CAMERA,
  REMOVE_CAMERA,
  OPEN_CAMERA_PROPS,
  CLOSE_CAMERA_PROPS,
} from "../constants/app.constants";
import { TAppState, TAppActions } from "../types/app.types";

const initialState: TAppState = {
  cameras: [],
  sideFormProps: {
    isOpened: false,
    currentCameraId: "",
  },
};

export const appReducer = (
  state: TAppState = initialState,
  action: TAppActions
): TAppState => {
  switch (action.type) {
    case UPDATE_CAMERA:
    case CREATE_CAMERA:
      const newList = Array.from(
        new Map([...state.cameras, action.payload]).entries()
      );
      return { ...state, cameras: newList };
    case REMOVE_CAMERA:
      const map = new Map([...state.cameras]);
      map.delete(action.payload);
      return { ...state, cameras: Array.from(map.entries()) };
    case OPEN_CAMERA_PROPS:
      return {
        ...state,
        sideFormProps: { isOpened: true, currentCameraId: action.payload },
      };
    case CLOSE_CAMERA_PROPS:
      return {
        ...state,
        sideFormProps: { ...state.sideFormProps, isOpened: false },
      };
    default:
      return state;
  }
};
