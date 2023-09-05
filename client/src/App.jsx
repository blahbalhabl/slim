import { 
  Routes, 
  Route, } from "react-router-dom"
import RequireAuth from "./components/RequireAuth"
import { AuthProvider } from "./context/AuthContext"
import PersistLogin from "./components/PersistLogin"

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Unauthorized from "./pages/Unauthorized"
import RandomPage from "./pages/RandomPage"
import AdminPage from "./pages/AdminPage"

import './App.css'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <div className="App__Content">
        <Sidebar />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/random" element={<RandomPage />} />
          
          {/* Private routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={['admin']}/>}>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/admin" element={<AdminPage />}/>
            </Route>
          </Route> 
        </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App
