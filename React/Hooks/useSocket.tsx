import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { io } from "socket.io-client";
import Config from "react-native-config";
import { SingleDevice } from "@store/deviceSlice/types";
import { PromiseDeviceList } from "@api/dto/deviceResponse";
import {
  actionCreateNewDevice,
  actionDeleteDevice,
  actionRemoveDevice,
  actionUpdateDeviceList,
  actionUpdateSingleDevice,
} from "@store/deviceSlice/deviceSlice";
import { apiRefresh } from "@api/loginAPI";
import { store } from "@store";
import { actionLogout } from "@store/globalAsyncFunc";
import { useAppDispatch } from "./storeHook";

// BASE url
const HOST = Config.API_HOST;

export function useSocket({ token }: { token: string | null }) {
  const dispatch = useAppDispatch();

  // For mobile app activity
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      //   console.log('App has come to the foreground!');
      // }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // console.log('HOPPER_PROFILE_GATEWAY', 'useEffect', 'token', token);

    if (!token || appStateVisible !== "active") {
      return;
    }

    // initialization socket

    // HOST + namespace
    const socket = io(HOST + "/user_device", {
      withCredentials: true,
      transports: ["websocket"],
      reconnectionAttempts: 5,
      timeout: 5000,
      auth: {
        "access-token": token,
      },
    });

    socket.on("connect", () => {
      console.log("MicareApp CONNECTED", "connected", "id", socket.id, "token");
      socket.emit("join");
    });

    socket.on("disconnect", (reason) => {
      console.log("MicareApp", "disconnect", "reason:", reason);
    });

    socket.on("connect_error", (err) => {
      console.log("MicareApp", "connect_error", err.name, err.message);
    });

    socket.on("error", (err) => {
      // Todo err status 401 (add refresh)
      if (err.statusCode === 401) {
        apiRefresh(store.getState().auth.refresh_token)
          .then(() => {
            console.log("refresh done");
          })
          .catch((error) => {
            dispatch(actionLogout());
          });
      }
      console.log("MicareApp", "error:", err);
    });

    // different events
    socket.on("get", (data: PromiseDeviceList) => {
      console.log("MicareApp GET", "get list");
      dispatch(actionUpdateDeviceList(data));
    });

    socket.on("create", (data: SingleDevice) => {
      console.log("create");
      dispatch(actionCreateNewDevice(data));
    });

    socket.on("remove", ({ imei }) => {
      console.log("MicareApp DELETE", "DELETE device");
      dispatch(actionRemoveDevice({ imei }));
    });

    socket.on("update", (data: SingleDevice) => {
      if (data) {
        dispatch(actionUpdateSingleDevice(data));
      }
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [appStateVisible, token]);
}
