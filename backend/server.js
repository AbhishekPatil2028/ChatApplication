import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/dbConnect.js";
import chatAuthRoutes from "./routes/ChatAuth.routes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chat.routes.js";
import ChatUser  from "./models/ChatUser.model.js";
import Chat from "./models/Chat.model.js"
import uploadRoutes from "./routes/upload.routes.js";
const app = express();


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/test", (req, res) => {
  res.json({ message: "API working ✅" });
});
/* ---------------- SOCKET ---------------- */
const server = http.createServer(app);

const io = new Server(server, {
  cors: 
  { origin: [
    "http://localhost:5173",
    "https://chat-application-9q8t.vercel.app"],
    methods:["GET","POST"],
     credentials: true,
   },transports:["websocket"],
});


const onlineUsersMap = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect",()=>{
    console.log("User disconnect")
  })

  /* ---------- JOIN ---------- */
  socket.on("join", async ({ userId }) => {
    onlineUsersMap.set(userId, socket.id);

    await ChatUser.findByIdAndUpdate(userId, { isOnline: true });

    //  IMPORTANT: SEND _id + name
    const onlineUsers = await ChatUser.find({ isOnline: true })
      .select("_id name");

    io.emit("onlineUsers", onlineUsers);
  });

  /* ---------- SEND MESSAGE (PRIVATE) ---------- */
  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, message, senderName,type } = data;

    const chat = await Chat.create({
      senderId,
      receiverId,
      message,
      type,
      isRead: false,
    });

    const payload = {
      _id: chat._id,
      senderId,
      receiverId,
      senderName,
      message,
      type,
      createdAt: chat.createdAt,
    };

    const receiverSocketId = onlineUsersMap.get(receiverId);

    // send to receiver
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", payload);
    }

    // send back to sender
    socket.emit("receiveMessage", payload);
  });

  /* ---------- DELIVERED ✔ ---------- */
  socket.on("messageDelivered", ({ messageId, senderId }) => {
    const senderSocketId = onlineUsersMap.get(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messageDelivered", { messageId });
    }
  });

  /* ---------- SEEN ✔✔ ---------- */
  socket.on("messageSeen", async ({ messageId, senderId }) => {
    await Chat.findByIdAndUpdate(messageId, { isRead: true });

    const senderSocketId = onlineUsersMap.get(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messageSeen", { messageId });
    }
  });

  /* ---------- MARK CHAT READ (UNREAD RESET) ---------- */
  socket.on("markRead", async ({ senderId, receiverId }) => {
    await Chat.updateMany(
      { senderId, receiverId, isRead: false },
      { $set: { isRead: true } }
    );
  });

  /* ---------- TYPING ---------- */
 socket.on("typing", ({ receiverId, senderId }) => {
  const receiverSocketId = onlineUsersMap.get(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("typing", { senderId });
  }
});

socket.on("stopTyping", ({ receiverId, senderId }) => {
  const receiverSocketId = onlineUsersMap.get(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("stopTyping", { senderId });
  }
});


  /* ---------- DISCONNECT ---------- */
  socket.on("disconnect", async () => {
    for (let [userId, socketId] of onlineUsersMap.entries()) {
      if (socketId === socket.id) {
        onlineUsersMap.delete(userId);
        await ChatUser.findByIdAndUpdate(userId, { isOnline: false });
        break;
      }
    }

    // 🔥 re-emit updated online users
    const onlineUsers = await ChatUser.find({ isOnline: true })
      .select("_id name");

    io.emit("onlineUsers", onlineUsers);
    console.log("ONLINE USERS EMITTED:", onlineUsers.map(u => u.name));
  });
});

// ---------------- EXPRESS ----------------
app.use(cors({
  origin:[
   "http://localhost:5173",
    "https://chat-application-9q8t.vercel.app"
  ],
  credentials:true
}));
app.use(express.json());

app.use("/api/chatAuth", chatAuthRoutes);
app.use("/api/chat", chatRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/api/chatAuth",userRoutes)

// ❗ 404 HANDLER LAST
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// DB
connectDB();

// ❗ IMPORTANT: use server.listen NOT app.listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});