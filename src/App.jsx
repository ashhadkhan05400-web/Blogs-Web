import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Signup from './auth/Signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Login } from './auth/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/Login' element = {<Login />} />
          <Route path='/Login/Dashboard' element = {<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App