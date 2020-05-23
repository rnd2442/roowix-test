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
      backdropClassName="transparent-backdrop"
      size="sm"
      keyboard
    >
      <button
        // appearance="subtle"
        className="side-btn"
        // style={{
        //   display: "flex",
        //   alignContent: "center",
        //   width: 20,
        //   transform: "translate(-50px, 200px)",
        //   position: "absolute",
        //   background: "white",
        //   color: "grey",
        //   // boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.15)",
        //   boxShadow:
        //     "0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05)",
        // }}
        onClick={closeDrawerHandler}
      >
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
