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
import Ordinances from "./pages/Ordinances"
import Enacted from "./pages/Enacted"
import Profile from "./pages/Profile"

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

          <Route element={<PersistLogin />}>
            {/* Public routes with Persistent Login */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/random-page" element={<RandomPage />} />
            
            {/* Private routes with Persistent Login*/}
            <Route element={<RequireAuth allowedRoles={['admin']}/>}>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/profile/:userId" element={<Profile />}/>
              <Route path="/admin-page" element={<AdminPage />}/>
              <Route path="/records/ordinances" element={<Ordinances />}/>
              <Route path="/records/ordinances/enacted" element={<Enacted />}/>
            </Route>
          </Route> 
        </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App
