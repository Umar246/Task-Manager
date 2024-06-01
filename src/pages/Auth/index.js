import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Register/Register'
import Login from './Login/Login'
import NoPage from './NoPage/NoPage'

export default function index() {
  return (
    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
    </Routes>
  )
}
