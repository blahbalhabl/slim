import { 
  Routes, 
  Route, } from "react-router-dom"
import RequireAuth from "./components/RequireAuth"
import { AuthProvider } from "./context/AuthContext"
import PersistLogin from "./components/PersistLogin"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import NotFound from "./components/NotFound"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Unauthorized from "./pages/Unauthorized"
import RandomPage from "./pages/RandomPage"
import AdminPage from "./pages/AdminPage"
import Ordinances from "./pages/Ordinances"
import Enacted from "./pages/Enacted"
import Profile from "./pages/Profile"
import { roles } from "./utils/userRoles"

import './App.css'

function App() {

const role = roles.role;
const level = roles.level;

  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <div className="App__Content">
        <Sidebar />
        <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Persistent Login Routes */}
        <Route element={<PersistLogin />}>
          {/* Public routes with Persistent Login */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/random-page" element={<RandomPage />} />
          
          {/* Private All Roles Route */}
          <Route element={<RequireAuth allowedRoles={[role.adn, role.spr, role.usr]}/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>

          {/* Private Admin Routes*/}
          <Route element={<RequireAuth allowedRoles={[role.adn]} />}>
            <Route path="/admin-page" element={<AdminPage />} />
            <Route path="/records/ordinances/:status" element={<Ordinances />} />
          </Route>

          {/* Private Superadmin Routes */}
          <Route element={<RequireAuth allowedRoles={[role.spr]} />}>
            <Route path="/auth/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App
