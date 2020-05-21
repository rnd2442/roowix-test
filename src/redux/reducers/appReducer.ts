import { CREATE_CAMERA } from "../constants/app.constants";
import { TAppState, TAppActions } from "../types/app.types";

const initialState: TAppState = {
  cameras: [],
};

export const appReducer = (
  state: TAppState = initialState,
  action: TAppActions
): TAppState => {
  switch (action.type) {
    case CREATE_CAMERA:
      return { ...state, cameras: [...state.cameras, action.payload] };
    default:
      return state;
  }
};
