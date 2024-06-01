import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../pages/Admin'
import Auth from '../pages/Auth'
import User from '../pages/User'

export default function Index() {
    return (
        <Routes>
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/user/*" element={<User />} />
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    )
}
