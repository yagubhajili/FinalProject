import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import HomeAdmin from './components/Home/HomeAdmin'
import Login from './components/auth/Login'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loginAdmin" element={<Login />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
