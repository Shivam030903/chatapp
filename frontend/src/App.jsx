import React from 'react'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext'


const App = () => {
  const {authUser} = useAuthContext()
  console.log(authUser);
  
  return (
    <div className='px-4 h-screen flex items-center justify-center'>
      
      {/* <Signup/> */}
      <Routes>
        <Route path='/' element={authUser ?  <Home/> : <Navigate to={"/signin"} />}></Route>
        <Route path='/signup' element={authUser ? 
        <Navigate to="/" /> : <Signup/>}></Route>
        <Route path='/signin' element={ authUser ? 
        <Navigate to="/" /> : <Login/> }></Route>
      </Routes>
      {/* <Home/> */}
      <Toaster/>
    </div>
    
  )
}

export default App