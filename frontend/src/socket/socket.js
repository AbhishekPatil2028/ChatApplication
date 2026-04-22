import { io } from "socket.io-client";

const chatSocket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
  
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});



export default chatSocket;
