import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Tasks from './Tasks/Tasks'
import Users from './Users/Users'
import NoPage from './NoPage/NoPage'

export default function Index() {
  return (
    <div className="admin-task p-sm-0 p-md-2 p-lg-4">
      <div className="bg-white inner ">

        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  )
}
