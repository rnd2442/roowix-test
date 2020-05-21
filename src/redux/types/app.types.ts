import { appActions } from "../actions/app.actions";
import { TCamera } from "../../types";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type TAppState = {
  cameras: TCamera[];
};

export type TAppActions = ReturnType<InferValueTypes<typeof appActions>>;
