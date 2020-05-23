import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Button, Icon } from "rsuite";
import { appActions } from "../redux/actions/app.actions";
import { buildCamera } from "../utils";
import { RootState } from "../types";
import { CameraMenu } from "./CameraMenu";

export const SideForm: React.FC = () => {
  const dispatch = useDispatch();
  const { sideFormProps, cameras } = useSelector((state: RootState) => {
    return state.app;
  });
  const { isOpened, currentCameraId } = sideFormProps;

  const camera = new Map(cameras).get(currentCameraId) || buildCamera();

  const closeDrawerHandler = () => dispatch(appActions.closeCameraProps());

  return (
    <Drawer
      show={isOpened}
      onHide={closeDrawerHandler}
      backdrop={false}
      size="sm"
      keyboard
    >
      <button className="side-btn" onClick={closeDrawerHandler}>
        <Icon icon="caret-right" size="2x" />
      </button>
      <Drawer.Header>
        <Drawer.Title>{`Camera ${currentCameraId}`}</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <CameraMenu key={currentCameraId} camera={camera} />
      </Drawer.Body>
    </Drawer>
  );
};
