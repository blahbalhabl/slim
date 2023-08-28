import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"


function App() {
  return (
    <>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </main>
    </>
  )
}

export default App
