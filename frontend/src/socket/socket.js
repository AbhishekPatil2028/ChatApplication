import { io } from "socket.io-client";

const chatSocket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});



export default chatSocket;
