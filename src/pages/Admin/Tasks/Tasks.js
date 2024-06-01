import { message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import { PiTrashLight } from 'react-icons/pi'
import { useUsersContext } from '../../../context/UsersContext'

const initialState = { taskTitle: '', taskStartDate: '', taskEndDate: '', taskDescription: '', assignedTo:'' }
export default function Tasks() {
  const [taskData, setTaskData] = useState(initialState)
  const [taskDataForEdit, setTaskDataForEdit] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedTasks, setFetchedTasks] = useState([])
  const { fetchedUsers } = useUsersContext()

  console.log(fetchedUsers)

  const URL = 'http://localhost:8005';

  //__________________________________________
  const handleChange = (e) => {

    setTaskData(previousState => ({ ...previousState, [e.target.name]: e.target.value }))

  }
  //__________________________________________
  const handleChangeForEdit = (e) => {

    setTaskDataForEdit(previousData => ({ ...previousData, [e.target.name]: e.target.value }))

  }
  //__________________________________________

  // CREATING TASK
  const handleSubmitedTask = async (e) => {
    e.preventDefault();

    let { taskTitle, taskStartDate, taskEndDate, taskDescription, assignedTo } = taskData
    taskTitle = taskTitle.trim()
    taskDescription = taskDescription.trim()


    if (!taskTitle || taskTitle.length < 3) {
      return message.error('Enter title correctly')
    }
    if (!taskStartDate) {
      return message.error('Enter start date correctly')
    }
    if (!taskEndDate) {
      return message.error('Enter end date correctly')
    }
    if (!assignedTo) {
      return message.error('Select username correctly')
    }
    if (!taskDescription || taskDescription.length < 10) {
      return message.error('Enter description correctly')
    }

    let dataOfTask = {
      taskTitle,
      taskStartDate,
      taskEndDate,
      taskDescription,
      assignedTo,
      status: 'incomplete'
    }

    console.log(dataOfTask)


    setIsLoading(true);
    await axios.post(`${URL}/admin/task`, dataOfTask)
      .then((res) => {

        console.log('working properly');

        console.log(res);

        setIsLoading(false);

        message.success('Task created successfully!');

        setTaskData(initialState);  // Reset form

      }).catch((err) => {

        console.error('There is an error:', err);

        setIsLoading(false);

        message.error('Failed to create task!');

      });

    setTaskData(initialState)
    fetchTasks()
  }

  //__________________________________________

  //READING TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${URL}/admin/task`);

      console.log(res);

      const { data } = res;

      setFetchedTasks(data);

    } catch (err) {

      console.error('Something went wrong while fetching Tasks', err);
    }
  };


  useEffect(() => {

    fetchTasks()

  }, [])

  // ___________________________________________
  // DELETE TASK

  const handleDeleteTask = (ID) => {

    axios.delete(`${URL}/admin/task/${ID}`)
      .then((res) => {

        let afterDeleteTasks = fetchedTasks.filter((task) => task._id !== ID)

        setFetchedTasks(afterDeleteTasks)

        message.success('Task deleted successfully')

      }).catch((err) => {

        console.log("There is an error while deleting task ", err)
      })
  }
  // ___________________________________________
  // UPDATE TASK
  const handleEditTask = (task) => {
    // console.log(task)
    setTaskDataForEdit(task)
    // console.log("Task Data for Edit",taskDataForEdit)
  }


  const handleUpdateTask = async (e) => {

    e.preventDefault()
    const taskID = taskDataForEdit._id

    setIsLoading(true)
    await axios.put(`${URL}/admin/task/${taskID}`, taskDataForEdit)
      .then((res) => {

        const afterUpdatedTasks = fetchedTasks.map((task) => task._id === taskDataForEdit._id ? res.data : task)

        setFetchedTasks(afterUpdatedTasks)

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
        <div className="row">
          <h2>Tasks</h2>
        </div>

        <div className="row mt-4">

          {fetchedTasks.map((task) => {
            return (<>
              <div className="col-12 col-md-6 col-lg-4 mb-4 " key={task._id}>
                <div className="card p-3 adminTaskStyles" style={{ height: '48vh', borderRadius: '10px', backgroundColor: '#f9f9ed', border: 'none' }}>

                  {/* Title */}
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <p className='fw-bold'>Title</p>
                    </div>

                    <div className='d-flex justify-content-between' style={{ marginTop: '-10px' }}>
                      <button className='btn btn-sm' onClick={() => handleEditTask(task)} data-bs-toggle="modal" data-bs-target="#editTaskModal" ><AiOutlineEdit className='text-primary' size={20} /></button>

                      <button className='btn btn-sm ' onClick={() => handleDeleteTask(task._id)} ><PiTrashLight size={20} className='text-danger' /></button>


                    </div>
                  </div>

                  <div>
                    <p style={{ marginTop: '-8px' }}>{task.taskTitle}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <div>
                      <div>
                        <p className='fw-bold'>Decription</p>
                      </div>
                    </div>

                    <div>
                      <p style={{ marginTop: '-8px' }}>{task.taskDescription} </p>
                    </div>
                  </div>
                  {/* Date */}
                  <div>
                    <div>
                      <p className='fw-bold'>Date <span className='fw-normal'>{task.taskStartDate}</span>  TO <span className='fw-normal'>{task.taskEndDate} </span></p>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '-25px' }}>
                    <div>
                      <p className='fw-bold'>Assigned to <span className='fw-normal'>{task.assignedTo}</span></p>
                    </div>
                  </div>



                </div>
              </div>
            </>)
          })

          }

          {/* Add Card Button */}
          <div className="col-12 col-md-6 col-lg-4 mb-4" >
            <div className="card  " style={{ height: '48vh', borderRadius: '10px', border: 'none' }}>
              <button className='btn btn-outline-primary w-100 h-100 ' data-bs-toggle="modal" data-bs-target="#newTodoModal" ><span><AiOutlinePlus size={40} /></span></button>
            </div>
          </div>

        </div>

        {/*  */}
      </div>



      {/* MODALS ARE HERE */}
      {/* _________________________________________________________________________________________________ */}

      {/* Modal-1: Add Task Modal */}

      {/* <!-- Modal --> */}
      <div className="modal fade" id="newTodoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


              {/* Form (Modal) */}
              <form >

                <div className="row mb-0 mb-md-3">
                  <div className="col-12 mb-3 mb-md-0 ">
                    <input type="text" onChange={handleChange} value={taskData.taskTitle || ''} className='form-control shadow-none' name='taskTitle' required placeholder='Enter Todo Title' />
                  </div>
                </div>

                <div className="row mb-0 mb-md-3">
                  <div className="col-12 mb-3 mb-md-0 ">
                    <select className="form-select shadow-none" required name='assignedTo' value={taskData.assignedTo || ''}  onChange={handleChange}>
                      <option selected>Select User</option>
                      {fetchedUsers.map((user) => {
                        return (
                          <>
                            <option value={user.name} key={user._id}>{user.name}</option>
                          </>
                        )
                      })}
                    </select>
                  </div>
                </div>


                <div className="row mb-0 mb-md-3 d-flex justify-content-between align-items-center">
                  <div className="col-12 col-md-5 mb-1 mb-md-0">
                    <input type="date" required name='taskStartDate' value={taskData.taskStartDate || ''} onChange={handleChange} className='form-control shadow-none' />
                  </div>

                  <div className="col-12 col-md-auto mb-1 mb-md-0 text-center">
                    <span>TO</span>
                  </div>

                  <div className="col-12 col-md-5 mb-3 mb-md-0">
                    <input type="date" required name='taskEndDate' value={taskData.taskEndDate || ''} onChange={handleChange} className='form-control shadow-none' />
                  </div>
                </div>


                <div className="row">
                  <div className="col">
                    <textarea required className='form-control shadow-none' value={taskData.taskDescription || ''} onChange={handleChange} name='taskDescription' cols="10" rows="3" placeholder='Description' />
                  </div>
                </div>

                <div className="modal-footer mb-0">
                  {!isLoading ?
                    <button type="button" onClick={handleSubmitedTask} className="btn btn-outline-primary mb-0 w-100" >Add Task</button>
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


              {/* Form (Modal) */}
              <form>

                <div className="row mb-0 mb-md-3">
                  <div className="col-12 mb-3 mb-md-0 ">
                    <input type="text" className='form-control shadow-none' value={taskDataForEdit.taskTitle} onChange={handleChangeForEdit} name='taskTitle' required placeholder='Enter Todo Title' />
                  </div>
                </div>

                <div className="row mb-0 mb-md-3">
                  <div className="col-12 mb-3 mb-md-0 ">
                    <select className="form-select shadow-none" required name='assignedTo' value={taskDataForEdit.assignedTo} onChange={handleChangeForEdit}>
                      <option selected>Select User</option>
                      {fetchedUsers.map((user) => {
                        return (
                          <>
                            <option value={user.name} key={user._id}>{user.name}</option>
                          </>
                        )
                      })}
                    </select>
                  </div>
                </div>


                <div className="row mb-0 mb-md-3 d-flex justify-content-between align-items-center">
                  <div className="col-12 col-md-5 mb-1 mb-md-0">
                    <input type="date" required name='taskStartDate' value={taskDataForEdit.taskStartDate} onChange={handleChangeForEdit} className='form-control shadow-none' />
                  </div>

                  <div className="col-12 col-md-auto mb-1 mb-md-0 text-center">
                    <span>TO</span>
                  </div>

                  <div className="col-12 col-md-5 mb-3 mb-md-0">
                    <input type="date" required name='taskEndDate' value={taskDataForEdit.taskEndDate} onChange={handleChangeForEdit} className='form-control shadow-none' />
                  </div>
                </div>


                <div className="row">
                  <div className="col">
                    <textarea required className='form-control shadow-none' value={taskDataForEdit.taskDescription} onChange={handleChangeForEdit} name='taskDescription' cols="10" rows="3" placeholder='Description' />
                  </div>
                </div>

                <div className="modal-footer mb-0">
                  {!isLoading ?
                    <button type="button" className="btn btn-outline-primary mb-0 w-100" onClick={handleUpdateTask} >Update Task</button>
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
