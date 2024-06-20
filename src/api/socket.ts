import { io } from "socket.io-client";
import { ENDPOINT } from "../shared/constants";

export const socket = io(ENDPOINT, { autoConnect: false });

