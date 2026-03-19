import { io } from "socket.io-client";

const chatSocket = io("http://localhost:5000", {
    autoConnect: false,
  reconnection: false,  // 🔥 STOP auto reconnect loop
});

export default chatSocket;