import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyTasks from './MyTasks/MyTasks'
import NoPage from './NoPage/NoPage'

export default function Index() {
  return (
    <div className="admin-task p-4">
      <div className="bg-white inner ">

        <Routes>
          <Route path="/" element={<MyTasks />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  )
}
