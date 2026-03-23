# 💬 Real-Time Chat Application (MERN + Socket.IO)

A full-stack real-time chat application built using the **MERN stack** with **Socket.IO** for instant messaging. This app supports private messaging, online status, typing indicators, and image sharing — similar to WhatsApp.

---

## 🚀 Live Demo

* 🌐 Frontend: https://chat-application-9q8t.vercel.app
* ⚙️ Backend: https://chatapplication-hddu.onrender.com

---

## 🧠 Features

### 🔐 Authentication

* User Signup & Login (JWT based)
* Secure password handling

### 💬 Real-Time Chat

* One-to-one private messaging
* Instant message delivery using Socket.IO
* Message status:

  * ✔ Sent
  * ✔✔ Delivered
  * ✔✔ Seen

### 🟢 User Presence

* Online / Offline status
* Last seen tracking

### ✍️ Typing Indicator

* Shows when the other user is typing...

### 🖼️ Media Support

* Send and receive images in chat

### 🔔 Notifications

* Unread message count per user

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* CSS (Custom UI)
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Socket.IO

### Deployment

* Frontend → Vercel
* Backend → Render

---

## 📂 Project Structure

```
ChatApp/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── socket/
│   │   └── components/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
```

---

## ⚙️ Environment Variables

### 🔹 Frontend (.env)

```
VITE_API_URL=https://chatapplication-hddu.onrender.com/api
VITE_SOCKET_URL=https://chatapplication-hddu.onrender.com
```

### 🔹 Backend (.env)

```
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
PORT=5000
```

---

## ▶️ Run Locally

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔌 Socket.IO Events

| Event Name       | Description               |
| ---------------- | ------------------------- |
| join             | User joins chat           |
| sendMessage      | Send message              |
| receiveMessage   | Receive message           |
| typing           | Typing indicator          |
| stopTyping       | Stop typing               |
| messageSeen      | Mark message as seen      |
| messageDelivered | Mark message as delivered |

---

## 🚨 Challenges Solved

* Real-time communication using WebSockets
* Handling CORS in production (Render + Vercel)
* Managing online users with Socket.IO
* Optimizing message delivery and read receipts

---

## 📈 Future Enhancements

* 👥 Group Chat
* 📞 Voice & Video Calling (WebRTC)
* 🔔 Push Notifications
* 🌙 Dark Mode

---

## 👨‍💻 Author

**Abhishek Patil**

* 📧 Email: [abhiapatil2028@gmail.com](mailto:abhiapatil2028@gmail.com)
* 💼 LinkedIn: https://linkedin.com/in/your-profile
* 💻 GitHub: https://github.com/your-username

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

---
