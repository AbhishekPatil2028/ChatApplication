import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem("chatUser"));

  // 🔒 Not logged in → login page
  if (!user) {
    return <Navigate to="/chat-login" replace />;
  }

  // 🔙 Prevent browser back logout
  useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventBack);

    return () => window.removeEventListener("popstate", preventBack);
  }, []);

  return children;
}
































