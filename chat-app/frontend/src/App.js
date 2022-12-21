import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import "./App.css"
import LandingPage from "./pages/LandingPage"
import Signup from "./pages/Signup"
import ChatRoom from "./pages/ChatRoom"

export default function App() {
  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!user ? <LandingPage /> : <Navigate to="/chatroom" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/chatroom" />}
        />
        <Route
          path="/chatroom"
          element={user ? <ChatRoom /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
