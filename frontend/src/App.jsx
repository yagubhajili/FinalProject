import './App.css'
import Home from './pages/home/Home'
import SignUp from './pages/auth/signup/SignUp'
import Login from './pages/auth/login/Login'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('http://localhost:3200/auth/me')
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        console.log("data", data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  })
  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    )
  }

  return (
    <div className='flex max-w-6xl mx-auto'>
      <Sidebar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/notifications' element={<NotificationPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />

      </Routes>
      <RightPanel />
      <Toaster />
    </div>
  )
}

export default App
