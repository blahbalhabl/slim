import { 
  Routes, 
  Route, } from "react-router-dom"
import RequireAuth from "./components/RequireAuth"
import { AuthProvider } from "./context/AuthContext"
import Header from "./components/Header"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Unauthorized from "./pages/Unauthorized"

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Private routes */}
        <Route element={<RequireAuth allowedRoles={['admin']}/>}>
          <Route path="/" exact element={<Dashboard />}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App
