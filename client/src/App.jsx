import { 
  Routes, 
  Route,
  Navigate } from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from "./context/AuthContext"
import Header from "./components/Header"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private route */}
        <Route
          path="/" exact
          element={<PrivateRoute element={<Dashboard />} />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App
