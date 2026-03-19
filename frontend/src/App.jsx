import { useState } from 'react'
import { Routes ,Route,Navigate } from 'react-router-dom';
import ChatHome from "./pages/Chathome";
import ChatLogin from "./pages/ChatLogin";
import ChatSignup from "./pages/ChatSignup";
import ChatPage from "./pages/ChatPage"
import RequireAuth from "./Auth/ChatRequireAuth";
import GuestOnly from "./Auth/ChatGuestOnly";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
       <Route path="/" element={<Navigate to="/chat-login" />} />
      <Route path="/chat-home" element={<ChatHome />} />
      <Route path="/chat-login" element={
        <GuestOnly>
          <ChatLogin />
        </GuestOnly>
      } />
      <Route path="/chat-signup" element={
        <GuestOnly>
          <ChatSignup />
        </GuestOnly>
      } />
      <Route path="/chat" element={
        <RequireAuth>
          <ChatPage />
        </RequireAuth>
      } />
     </Routes>
    </>
  )
}

export default App
