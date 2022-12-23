import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import "./App.css"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ChatRoom from "./pages/ChatRoom"
import WaitingRoom from "./pages/WaitingRoom"

export default function App() {
  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!user ? <LandingPage /> : <Navigate to="/waitingroom" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/waitingroom" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/waitingroom" />}
        />
        <Route
          path="/waitingroom"
          element={user ? <WaitingRoom /> : <Navigate to="/" />}
        />
        <Route
          path="/chatroom"
          element={user ? <ChatRoom /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
