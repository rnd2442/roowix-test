import {
  CREATE_CAMERA,
  UPDATE_CAMERA,
  REMOVE_CAMERA,
} from "../constants/app.constants";
import { TAppState, TAppActions } from "../types/app.types";

const initialState: TAppState = {
  cameras: [],
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
    default:
      return state;
  }
};
