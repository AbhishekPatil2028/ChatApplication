import { io } from "socket.io-client";

const chatSocket = io(import.meta.env.VITE_API_URL, {
  autoConnect: false,
  transports: ["websocket"],
  withCredentials:true,

});

export default chatSocket;
