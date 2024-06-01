import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import { PiTrashLight } from 'react-icons/pi'
import { useUsersContext } from '../../../context/UsersContext'



const initialState = { email: '', name: '', title: '', role: '' }
export default function Users() {
  const [userData, setUserData] = useState(initialState)
  const [userDataForEdit, setUserDataForEdit] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const {fetchUsers, fetchedUsers, setFetchedUsers} = useUsersContext()
 

  const URL = 'http://localhost:8005';

  //__________________________________________
  const handleChange = (e) => {

    setUserData((previousState) => ({ ...previousState, [e.target.name]: e.target.value }))

  }
  //__________________________________________
  const handleChangeForEdit = (e) => {

    setUserDataForEdit((previousData) => ({ ...previousData, [e.target.name]: e.target.value }))

  }
  //__________________________________________

  // CREATING USER
  const handleSubmitedUser = async (e) => {
    e.preventDefault();

    let { email, name, title, role } = userData
    email = email.trim()
    name = name.trim()
    title = title.trim()


    if (!email) {
      return message.error('Enter email correctly')
    }
    if (!name || name.length < 3) {
      return message.error('Enter name correctly')
    }
    if (!title || title.length < 3) {
      return message.error('Enter title correctly')
    }
    if (!role) {
      return message.error('Select a role')
    }

    let dataOfUser = {
      email, name, title, role,
    }


    setIsLoading(true);
    await axios.post(`${URL}/admin/user`, dataOfUser)
      .then((res) => {

        console.log(res);

        setIsLoading(false);

        message.success('User created successfully!');

        setUserData(initialState);  // Reset form

      }).catch((err) => {

        console.error('There is an error:', err);

        setIsLoading(false);

        message.error('Failed to create user!');

      });

    setUserData(initialState)
    fetchUsers()
  }

  //__________________________________________

  //READING USERS
  // const fetchUsers = async () => {
  //   try {
  //     const res = await axios.get(`${URL}/admin/user`);

  //     console.log(res);

  //     const { data } = res;

  //     setFetchedUsers(data);

  //   } catch (err) {

  //     console.error('Something went wrong while fetching Tasks', err);
  //   }
  // };


  // useEffect(() => {

  //   fetchUsers()

  // }, [])

  // ___________________________________________
  // DELETE USER

  const handleDeleteUser = (ID) => {
    console.log(ID)

    axios.delete(`${URL}/admin/user/${ID}`)
      .then((res) => {

        let afterDeleteUsers = fetchedUsers.filter((user) => user._id !== ID)

        setFetchedUsers(afterDeleteUsers)

        message.success('User deleted successfully')

      }).catch((err) => {

        console.log("There is an error while deleting task ", err)
        message.error('Failed to delete user')
      })
  }
  // ___________________________________________
  // UPDATE TASK
  const handleEditUser = (user) => {
    // console.log(task)
    setUserDataForEdit(user)
    // console.log("Task Data for Edit",taskDataForEdit)
  }


  const handleUpdateUser = async (e) => {

    e.preventDefault()
    const userID = userDataForEdit._id

    setIsLoading(true)
    await axios.put(`${URL}/admin/user/${userID}`, userDataForEdit)
      .then((res) => {

        const afterUpdatedUsers = fetchedUsers.map((user) => user._id === userDataForEdit._id ? res.data : user)

        setFetchedUsers(afterUpdatedUsers)

        setIsLoading(false)

        message.success('Task updated successfully')

      }).catch((err) => {

        console.error("Error while updating task", err)

        setIsLoading(false)

        message.error('Failed to update task')

      })

  }


  return (
    <>
      <div className="container p-sm-2 p-md-3 p-lg-4">

        {/*  */}
        <div className="d-flex align-items-center justify-content-between me-2 me-md-4 mt-3 mt-md-0">
          <div>
            <h2>Users</h2>
          </div>

          <div>
            <button className='btn btn-primary px-sm-2 px-md-4' data-bs-toggle="modal" data-bs-target="#newTodoModal" ><span><AiOutlinePlus size={30} /></span></button>
          </div>
        </div>


        <div className="row mt-2 mt-md-5">
          <div className="col">
            {/* Table of Users */}
            <table className="table align-items-center mb-0 bg-white table-responsive">
              <thead className="bg-light">

                <tr>
                  <th className='text-center'>Sr #</th>
                  <th >Name</th>
                  <th >Title</th>
                  <th>Role</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fetchedUsers.map((user, index) => {
                  return (
                    <>
                      <tr key={user._id}>
                        <td className='align-middle text-center'>
                          <p className="fw-bold mb-1">{index + 1}.</p>
                        </td>
                        <td className='align-middle'>
                          <div>
                            <div >
                              <p className="fw-bold mb-1">{user.name}</p>
                              <p className="text-muted mb-0">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className='align-middle '>
                          <p className='mt-2'>{user.title}</p>
                        </td>
                        <td className='align-middle '>
                          {user.role === 'admin' ?
                            <span className="badge text-bg-warning ">{user.role}</span>
                            : <span className="badge text-bg-primary ">{user.role}</span>
                          }
                        </td>

                        <td className='align-middle text-center '>
                          <button className='btn btn-sm' data-bs-toggle="modal" data-bs-target="#editTaskModal"onClick={()=>handleEditUser(user)}><AiOutlineEdit className='text-primary' size={20} /></button>

                          <button className='btn btn-sm ' onClick={() => handleDeleteUser(user._id)}><PiTrashLight size={20} className='text-danger' /></button>


                        </td>
                      </tr>
                    </>
                  )
                })}



              </tbody>
            </table>
          </div>
        </div>

        {/*  */}
      </div >



      {/* MODALS ARE HERE */}
      {/* _________________________________________________________________________________________________ */}

      {/* Modal-1: Add User Modal */}

      {/* <!-- Modal --> */}
      <div className="modal fade" id="newTodoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add User</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


              {/* Form (Modal) */}
              <form >
                <div className="row mb-0 mb-md-3">
                  <div className="col-12  mb-3 mb-md-0 ">
                    <input type="email" className='form-control shadow-none' value={userData.email || ''} onChange={handleChange} name='email' required placeholder='example@email.com' />
                  </div>
                </div>


                <div className="row mb-0 mb-md-3">
                  <div className="col-12 col-md-6 mb-3 mb-md-0 ">
                    <input type="text" className='form-control shadow-none' value={userData.name || ''} onChange={handleChange} name='name' required placeholder='Name' />
                  </div>

                  <div className="col-12 col-md-6 mb-3 mb-md-0 ">
                    <input type="text" className='form-control shadow-none' value={userData.title || ''} onChange={handleChange} name='title' required placeholder='Title' />
                  </div>
                </div>

                <div className="row mb-0 mb-md-3">

                  <div className="col-12  mb-3 mb-md-0 ">
                    <select className="form-select shadow-none" value={userData.role || ''} required name='role' onChange={handleChange}>
                      <option selected>Select Role</option>
                      <option value='user'>User</option>
                      <option value='admin'>Admin</option>
                    </select>
                  </div>
                </div>




                <div className="modal-footer mb-0">
                  {!isLoading ?
                    <button type="button" className="btn btn-outline-primary mb-0 w-100" onClick={handleSubmitedUser}>Add User</button>
                    : <button type="button" className="btn btn-outline-primary mb-0 w-100" disabled={isLoading}><div className='spinner-border spinner-border-sm'></div></button>
                  }
                </div>


              </form>
            </div>

          </div>
        </div>
      </div>

      {/* _________________________________________________________________________________________________ */}

      {/* Modal-2: Edit Task Modal */}

      <div className="modal fade" id="editTaskModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


              {/* Form (Modal) */}
              <form>

                <div className="row mb-0 mb-md-3">
                  <div className="col-12  mb-3 mb-md-0 ">
                    <input type="email" className='form-control shadow-none' onChange={handleChangeForEdit} value={userDataForEdit.email || ''} name='email' required placeholder='example@email.com' />
                  </div>

                </div>


                <div className="row mb-0 mb-md-3">
                  <div className="col-12 col-md-6 mb-3 mb-md-0 ">
                    <input type="text" className='form-control shadow-none' onChange={handleChangeForEdit} value={userDataForEdit.name || ''} name='name' required placeholder='Name' />
                  </div>

                  <div className="col-12 col-md-6 mb-3 mb-md-0 ">
                    <input type="text" className='form-control shadow-none' onChange={handleChangeForEdit} value={userDataForEdit.title || ''} name='title' required placeholder='Title' />
                  </div>
                </div>

                <div className="row mb-0 mb-md-3">

                  <div className="col-12  mb-3 mb-md-0 ">
                    <select className="form-select shadow-none" id="inputGroupSelect02" onChange={handleChangeForEdit} value={userDataForEdit.role || ''} name='role'>
                      <option selected>Select Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer mb-0">
                  {!isLoading ?
                    <button type="button" className="btn btn-outline-primary mb-0 w-100" onClick={handleUpdateUser}>Update User</button>
                    : <button type="button" className="btn btn-outline-primary mb-0 w-100" disabled={isLoading}><div className='spinner-border spinner-border-sm'></div></button>
                  }
                </div>


              </form>
            </div>

          </div>
        </div>
      </div>
      {/* MODALS FINSIH */}
    </>
  )
}
