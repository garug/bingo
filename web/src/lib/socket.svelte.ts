import { io } from "socket.io-client";

export const socket = io(`${import.meta.env.VITE_API_URL || ""}`);

socket.on("connect_event", function (data) {
  console.log("connected");
});

socket.on("disconnect_event", function (data) {
  console.log("disconnected");
});

socket.onAny((s) => "message: " + s);
