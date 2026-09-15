import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Signup from './auth/Signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Login } from './auth/Login'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/Signup' element = {<Signup />} />
          <Route path='/Signup/Login' element = {<Login />} />
          <Route path='/Login' element = {<Login />} />
          <Route path='/Login/Dashboard' element = {<Dashboard />} />
          <Route path='/Dashboard' element = {<Dashboard />} />
          <Route path='/Dashboard/CreatePost' element = {<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App