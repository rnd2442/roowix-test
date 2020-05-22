import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "rsuite";
import { appActions } from "../redux/actions/app.actions";
import { buildCamera } from "../utils";
import { RootState } from "../types";
import { CameraMenu } from "./CameraMenu";

export const SideForm: React.FC = ({}) => {
  const dispatch = useDispatch();
  const { sideFormProps, cameras } = useSelector((state: RootState) => {
    return state.app;
  });
  const { isOpened, currentCameraId } = sideFormProps;

  const camera = new Map(cameras).get(currentCameraId) || buildCamera();

  return (
    <Drawer
      show={isOpened}
      onHide={() => dispatch(appActions.closeCameraProps())}
      backdrop={false}
      backdropClassName="transparent-backdrop"
      keyboard
    >
      <Drawer.Header>
        <Drawer.Title>{`Camera ${currentCameraId}`}</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <CameraMenu key={currentCameraId} camera={camera} />
      </Drawer.Body>
    </Drawer>
  );
};
