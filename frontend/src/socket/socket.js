import { io } from "socket.io-client";

const chatSocket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket","polling"],

});

export default chatSocket;
