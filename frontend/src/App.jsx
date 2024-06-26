import { useState } from 'react'
import './App.css'
import Home from './pages/home/Home'
import SignUp from './pages/auth/signup/SignUp'
import Login from './pages/auth/login/Login'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/common/Sidebar'

function App() {


  return (
    <div className='flex max-w-6xl mx-auto'>
      <Sidebar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
