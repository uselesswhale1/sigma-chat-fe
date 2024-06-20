import { io } from "socket.io-client";
import { WEBSOCKET_ENDPOINT } from "../shared/constants";

export const socket = io(WEBSOCKET_ENDPOINT, { autoConnect: false });
